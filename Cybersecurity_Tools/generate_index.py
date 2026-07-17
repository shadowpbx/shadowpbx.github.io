import os
import re
import yaml
import markdown
import logging

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Configuration
MD_POSTS_DIR = '_posts'
OUTPUT_DIR = 'posts'
INDEX_FILE = 'index.html'
TEMPLATE_FILE = 'post_template.html'

# Sub-pages
CYBER_SCRIPTS_FILE = 'cybersecurity_scripts.html'
CYBER_TOOLS_FILE = 'cybersecurity_tools.html'
ALL_SCRIPTS_FILE = 'all_scripts.html'
ALL_TOOLS_FILE = 'all_tools.html'

def convert_md_to_html(md_file):
    """
    Converts a markdown file with YAML front matter into an HTML file using a template.
    Returns metadata for indexing or None if parsing fails.
    """
    if not os.path.exists(md_file):
        logging.error(f"Markdown file does not exist: {md_file}")
        return None

    try:
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        logging.error(f"Failed to read file {md_file}: {e}")
        return None

    # Parse Front Matter (Jekyll style)
    parts = re.split(r'---', content)
    if len(parts) >= 3:
        try:
            front_matter = yaml.safe_load(parts[1])
        except Exception as e:
            logging.error(f"Failed to parse YAML front matter in {md_file}: {e}")
            return None
        md_content = "---".join(parts[2:])
    else:
        logging.warning(f"File {md_file} does not contain valid YAML front matter. Skipping.")
        return None

    if not front_matter:
        logging.warning(f"Front matter in {md_file} is empty. Skipping.")
        return None

    # Get metadata
    title = front_matter.get('title', 'Untitled Post')
    date = front_matter.get('date', '')
    
    # Extract date from filename if not in front matter
    if not date:
        filename = os.path.basename(md_file)
        date_match = re.match(r'(\d{4}-\d{2}-\d{2})', filename)
        date = date_match.group(1) if date_match else "2026-01-01"
    
    # Clean date format to YYYY.MM.DD
    try:
        if isinstance(date, str):
            clean_date = date.replace('-', '.')
        else:
            clean_date = date.strftime('%Y.%m.%d')
    except Exception as e:
        logging.warning(f"Failed to format date '{date}' in {md_file}: {e}. Defaulting to current date.")
        clean_date = "2026.01.01"

    # Track classification (Script or Tool)
    track = front_matter.get('track', 'Script')
    track = str(track).strip().capitalize()
    if track not in ['Script', 'Tool']:
        track = 'Script'

    # Category classification (Cybersecurity or General)
    category = front_matter.get('category') or 'General'
    category = str(category).strip().capitalize()

    # Determine tags/categories
    tag = front_matter.get('tag') or front_matter.get('category') or front_matter.get('tags')
    if isinstance(tag, list):
        tag = tag[0] if tag else None
    
    if not tag:
        # Fallback tag based on title keywords
        title_lower = title.lower()
        if "python" in title_lower:
            tag = "PYTHON"
        elif "bash" in title_lower or "shell" in title_lower:
            tag = "BASH"
        elif "nmap" in title_lower or "scan" in title_lower:
            tag = "NMAP"
        elif "powershell" in title_lower:
            tag = "POWERSHELL"
        else:
            tag = "UTIL"
    
    tag = str(tag).upper()

    # Check for direct link bypass (e.g. standalone HTML tool)
    direct_link = front_matter.get('direct_link', '')
    if direct_link:
        summary = front_matter.get('summary', 'Interactive utility page.')
        return {
            "url": direct_link,
            "title": title,
            "summary": summary,
            "date": clean_date,
            "tag": tag,
            "track": track,
            "category": category
        }

    # Convert Markdown to HTML
    try:
        html_content = markdown.markdown(md_content, extensions=['fenced_code', 'tables'])
    except Exception as e:
        logging.error(f"Failed to convert markdown to HTML in {md_file}: {e}")
        return None

    # Load template
    if not os.path.exists(TEMPLATE_FILE):
        logging.error(f"Template file {TEMPLATE_FILE} not found. Cannot proceed with conversion.")
        return None

    try:
        with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
            template = f.read()
    except Exception as e:
        logging.error(f"Failed to read template file: {e}")
        return None

    # Inject content into template
    final_html = template.replace('{{ title }}', title)
    final_html = final_html.replace('{{ date }}', clean_date)
    final_html = final_html.replace('{{ content }}', html_content)

    # Save to output directory
    output_filename = os.path.basename(md_file).replace('.md', '.html')
    output_path = os.path.join(OUTPUT_DIR, output_filename)
    
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(final_html)
        logging.info(f"Generated HTML post: {output_path}")
    except Exception as e:
        logging.error(f"Failed to write HTML post to {output_path}: {e}")
        return None

    # Create a snippet for the index page
    snippet = re.sub('<[^<]+?>', '', html_content)[:150]
    snippet = snippet.replace('\n', ' ').strip() + "..."

    return {
        "url": f"posts/{output_filename}",
        "title": title,
        "summary": snippet,
        "date": clean_date,
        "tag": tag,
        "track": track,
        "category": category
    }

def update_page_list(file_path, posts):
    """
    Helper function to update a list page by swapping elements between POSTS_START and POSTS_END.
    """
    if not os.path.exists(file_path):
        logging.warning(f"File {file_path} not found. Skipping list generation.")
        return

    posts_html = ""
    for post in posts:
        posts_html += f"""
            <a href="{post['url']}" class="post-entry">
                <h3>{post['title']}</h3>
                <p class="post-summary">{post['summary']}</p>
                <div class="post-meta">
                    <span>DATE // {post['date']}</span>
                    <span class="meta-tag">{post['tag']}</span>
                </div>
            </a>"""

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        logging.error(f"Failed to read {file_path}: {e}")
        return

    start_tag = "<!-- POSTS_START -->"
    end_tag = "<!-- POSTS_END -->"
    
    if start_tag in content and end_tag in content:
        pattern = re.compile(f"{start_tag}.*?{end_tag}", re.DOTALL)
        content = pattern.sub(f"{start_tag}{posts_html}\n            {end_tag}", content)
    else:
        logging.warning(f"Placeholders not found in {file_path}")

    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        logging.info(f"Successfully updated {file_path}.")
    except Exception as e:
        logging.error(f"Failed to write updates to {file_path}: {e}")

def update_dashboard_index(cyber_scripts_len, cyber_tools_len, all_scripts_len, all_tools_len):
    """
    Updates the files count indicators inside index.html dashboard cards.
    """
    if not os.path.exists(INDEX_FILE):
        logging.error(f"Dashboard file {INDEX_FILE} not found.")
        return

    try:
        with open(INDEX_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        logging.error(f"Failed to read {INDEX_FILE}: {e}")
        return

    # Update counts
    content = re.sub(r'<!-- CYBER_SCRIPTS_COUNT -->.*?<!-- CYBER_SCRIPTS_COUNT_END -->', f'<!-- CYBER_SCRIPTS_COUNT -->{cyber_scripts_len}<!-- CYBER_SCRIPTS_COUNT_END -->', content)
    content = re.sub(r'<!-- CYBER_TOOLS_COUNT -->.*?<!-- CYBER_TOOLS_COUNT_END -->', f'<!-- CYBER_TOOLS_COUNT -->{cyber_tools_len}<!-- CYBER_TOOLS_COUNT_END -->', content)
    content = re.sub(r'<!-- ALL_SCRIPTS_COUNT -->.*?<!-- ALL_SCRIPTS_COUNT_END -->', f'<!-- ALL_SCRIPTS_COUNT -->{all_scripts_len}<!-- ALL_SCRIPTS_COUNT_END -->', content)
    content = re.sub(r'<!-- ALL_TOOLS_COUNT -->.*?<!-- ALL_TOOLS_COUNT_END -->', f'<!-- ALL_TOOLS_COUNT -->{all_tools_len}<!-- ALL_TOOLS_COUNT_END -->', content)

    try:
        with open(INDEX_FILE, 'w', encoding='utf-8') as f:
            f.write(content)
        logging.info(f"Successfully updated dashboard file counters in {INDEX_FILE}.")
    except Exception as e:
        logging.error(f"Failed to write dashboard counters to {INDEX_FILE}: {e}")

def main():
    if not os.path.exists(MD_POSTS_DIR):
        try:
            os.makedirs(MD_POSTS_DIR)
            logging.info(f"Created directory: {MD_POSTS_DIR}")
        except Exception as e:
            logging.critical(f"Failed to create directory {MD_POSTS_DIR}: {e}")
            return

    if not os.path.exists(OUTPUT_DIR):
        try:
            os.makedirs(OUTPUT_DIR)
            logging.info(f"Created directory: {OUTPUT_DIR}")
        except Exception as e:
            logging.critical(f"Failed to create directory {OUTPUT_DIR}: {e}")
            return

    all_posts_metadata = []
    
    try:
        files = os.listdir(MD_POSTS_DIR)
    except Exception as e:
        logging.critical(f"Failed to list directory {MD_POSTS_DIR}: {e}")
        return

    for filename in files:
        if filename.endswith('.md'):
            md_path = os.path.join(MD_POSTS_DIR, filename)
            metadata = convert_md_to_html(md_path)
            if metadata:
                all_posts_metadata.append(metadata)

    # Sort posts by date (newest first)
    all_posts_metadata.sort(key=lambda x: x['date'], reverse=True)

    # Group posts
    cyber_scripts = [p for p in all_posts_metadata if p['track'] == 'Script' and p['category'] == 'Cybersecurity']
    cyber_tools = [p for p in all_posts_metadata if p['track'] == 'Tool' and p['category'] == 'Cybersecurity']
    all_scripts = [p for p in all_posts_metadata if p['track'] == 'Script']
    all_tools = [p for p in all_posts_metadata if p['track'] == 'Tool']

    # Update list sub-pages
    update_page_list(CYBER_SCRIPTS_FILE, cyber_scripts)
    update_page_list(CYBER_TOOLS_FILE, cyber_tools)
    update_page_list(ALL_SCRIPTS_FILE, all_scripts)
    update_page_list(ALL_TOOLS_FILE, all_tools)

    # Update dashboard file counters
    update_dashboard_index(len(cyber_scripts), len(cyber_tools), len(all_scripts), len(all_tools))
    
    logging.info(f"Build Complete: Processed {len(all_posts_metadata)} files.")

if __name__ == "__main__":
    main()
