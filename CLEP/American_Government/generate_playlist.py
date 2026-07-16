#!/usr/bin/env python3
"""
CLEP Playlist Generator CLI Tool
Autodetects MP3 files locally or from a remote Cloudflare R2 / S3 URL and generates both playlist.json and playlist.js.
Incorporates course title and subtitle from about.txt if present.
"""

import os
import re
import sys
import json
import logging
import urllib.request
import urllib.parse

# Setup Logger with standard formatting
logging.basicConfig(
    level=logging.INFO,
    format='[%(levelname)s] %(asctime)s - %(message)s',
    datefmt='%H:%M:%S'
)
logger = logging.getLogger(__name__)

try:
    import click
except ImportError:
    logger.error("The 'click' package is required. Please install it with 'pip install click'.")
    sys.exit(1)


def natural_sort_key(s):
    """
    Key function for natural alphanumeric sorting (e.g. "2.1" comes before "10.1").
    """
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]


# Regex patterns to parse MP3 filenames from remote directories (HTML or S3 XML listing)
href_regex = re.compile(r'href=["\']([^"\']+\.mp3(?:[?#][^"\']*)?)["\']', re.IGNORECASE)
key_regex = re.compile(r'<Key>([^<]+\.mp3)</Key>', re.IGNORECASE)


def extract_mp3_tracks(content_str):
    """
    Parses HTML or XML string and extracts MP3 filenames.
    """
    tracks = []
    
    # 1. Try S3 XML <Key> tags first
    s3_keys = key_regex.findall(content_str)
    for key in s3_keys:
        filename = os.path.basename(key)
        if filename and filename not in tracks:
            tracks.append(filename)
            
    # 2. Try standard HTML links
    if not tracks:
        hrefs = href_regex.findall(content_str)
        for href in hrefs:
            decoded = urllib.parse.unquote(href)
            parsed = urllib.parse.urlparse(decoded)
            filename = os.path.basename(parsed.path)
            if filename and filename not in tracks:
                tracks.append(filename)
                
    return tracks


def parse_about_file(about_path):
    """
    Parses about.txt to extract Title and Sub Title.
    Returns (title, subtitle) defaults to folder name if file is missing or unparseable.
    """
    title = ""
    subtitle = ""
    if os.path.exists(about_path):
        try:
            with open(about_path, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line.lower().startswith('title:'):
                        title = line[len('title:'):].strip()
                    elif line.lower().startswith('sub title:'):
                        subtitle = line[len('sub title:'):].strip()
                    elif line.lower().startswith('subtitle:'):
                        subtitle = line[len('subtitle:'):].strip()
        except Exception as e:
            logger.warning(f"Error parsing about.txt: {e}")
            
    # Fallbacks if values were missing or empty
    if not title:
        title = os.path.basename(os.path.dirname(os.path.abspath(about_path))).replace('_', ' ').title()
    if not subtitle:
        subtitle = "Audio Lecture Series"
        
    return title, subtitle


@click.command()
@click.option(
    '--dir', '-d', 
    default='.', 
    help='Local directory path OR remote HTTP/HTTPS URL containing the audio files to scan.', 
    type=str
)
@click.option(
    '--output', '-o', 
    default='playlist', 
    help='Output playlist base name (default "playlist"). Generates both .json and .js versions.',
    type=click.Path()
)
@click.option(
    '--base-url', '-b',
    default='',
    help='Override default Cloudflare R2 base URL to prepend to audio tracks (defaults to remote dir URL if remote).'
)
def generate_playlist(dir, output, base_url):
    """
    Scans a local directory or remote URL for MP3 files and generates both JS and JSON playlist files.
    """
    is_remote = dir.startswith('http://') or dir.startswith('https://')
    mp3_files = []
    resolved_base_url = base_url
    
    # 1. Parse Title and Subtitle from local about.txt
    script_dir = os.path.dirname(os.path.abspath(__file__))
    about_path = os.path.join(script_dir, "about.txt")
    title, subtitle = parse_about_file(about_path)
    logger.info(f"Loaded Meta - Title: '{title}', Subtitle: '{subtitle}'")

    if is_remote:
        logger.info(f"Scanning remote URL: {dir}")
        if not resolved_base_url:
            resolved_base_url = dir
            
        try:
            # Set browser user agent to avoid bot blocks by Cloudflare R2
            req = urllib.request.Request(
                dir,
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                content = response.read().decode('utf-8', errors='ignore')
                
            mp3_files = extract_mp3_tracks(content)
            
            if not mp3_files:
                logger.warning(
                    f"No MP3 files found at remote URL: {dir} (Directory listing may be disabled).\n"
                    "Attempting local directory fallback to resolve track filenames..."
                )
        except Exception as e:
            logger.error(f"Failed to fetch remote directory listing: {e}")
            logger.warning("Attempting local directory fallback to resolve track filenames...")
            
    if not mp3_files:
        # Fallback to scan local directory
        local_dir = '.' if is_remote else dir
        logger.info(f"Scanning local directory: {os.path.abspath(local_dir)}")
        try:
            all_files = os.listdir(local_dir)
            mp3_files = [f for f in all_files if f.lower().endswith('.mp3')]
        except Exception as e:
            logger.error(f"Failed to read local directory {local_dir}: {e}")
            sys.exit(1)

    if not mp3_files:
        logger.warning("No MP3 files could be resolved locally or remotely.")
    
    # Sort files naturally
    mp3_files.sort(key=natural_sort_key)
    logger.info(f"Resolved {len(mp3_files)} MP3 audio track(s).")

    # Resolve output names
    base_dir = '.' if is_remote else os.path.abspath(dir)
    filename, ext = os.path.splitext(output)
    if ext.lower() in ['.json', '.js']:
        base_name = filename
    else:
        base_name = output

    js_path = os.path.join(base_dir, f"{base_name}.js")
    json_path = os.path.join(base_dir, f"{base_name}.json")

    # Ensure resolved_base_url ends with trailing slash if populated
    if resolved_base_url and not resolved_base_url.endswith('/'):
        resolved_base_url += '/'

    # 1. Construct JS format with metadata and tracks
    js_content = (
        "// Auto-generated playlist file. Do not edit manually.\n"
        "// Generated by: generate_playlist.py\n\n"
        f'const playlistTitle = "{title}";\n'
        f'const playlistSubtitle = "{subtitle}";\n'
        f'const baseUrl = "{resolved_base_url}";\n'
        "const tracks = [\n"
    )
    for f_name in mp3_files:
        escaped_name = f_name.replace('"', '\\"')
        js_content += f'  "{escaped_name}",\n'
    
    if mp3_files:
        js_content = js_content[:-2] + "\n"
    js_content += "];\n"

    # 2. Construct JSON format with metadata and tracks
    playlist_data = {
        "title": title,
        "subtitle": subtitle,
        "baseUrl": resolved_base_url,
        "tracks": mp3_files
    }
    json_content = json.dumps(playlist_data, indent=2, ensure_ascii=False)

    try:
        # Write JS file
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
        logger.info(f"Successfully generated JS playlist at: {js_path}")

        # Write JSON file
        with open(json_path, 'w', encoding='utf-8') as f:
            f.write(json_content)
        logger.info(f"Successfully generated JSON playlist at: {json_path}")

        click.echo(f"Success! {len(mp3_files)} tracks saved to {base_name}.js and {base_name}.json")
    except Exception as e:
        logger.error(f"Failed to write playlist files: {e}")
        sys.exit(1)


if __name__ == '__main__':
    generate_playlist()
