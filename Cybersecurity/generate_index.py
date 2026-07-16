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
REPO_NAME = 'Cybersecurity'
MD_POSTS_DIR = '_posts'
OUTPUT_DIR = 'posts'
INDEX_FILE = 'index.html'
TEMPLATE_FILE = 'post_template.html'
README_FILE = 'README.md'

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
    
    # Extract date from filename if not in front matter (Jekyll style: YYYY-MM-DD-title.md)
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

    # Determine tags/categories
    tag = front_matter.get('tag') or front_matter.get('category') or front_matter.get('tags')
    if isinstance(tag, list):
        tag = tag[0] if tag else None
    
    if not tag:
        # Fallback keyword-based tag determination
        title_lower = title.lower()
        if "wifi" in title_lower or "wireless" in title_lower:
            tag = "WIRELESS"
        elif "malware" in title_lower or "reverse" in title_lower:
            tag = "MALWARE"
        elif "forensics" in title_lower or "incident" in title_lower:
            tag = "FORENSICS"
        elif "pentest" in title_lower or "exploit" in title_lower:
            tag = "PENTEST"
        elif "harden" in title_lower or "defense" in title_lower:
            tag = "HARDENING"
        else:
            tag = "SECURITY"
    
    tag = str(tag).upper()

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
        "tag": tag
    }

def update_index(posts):
    """
    Updates index.html with links to the generated posts.
    """
    if not os.path.exists(INDEX_FILE):
        logging.error(f"Index file {INDEX_FILE} not found. Cannot update index.")
        return

    # Sort posts by date (newest first)
    posts.sort(key=lambda x: x['date'], reverse=True)
    
    html = ""
    for post in posts:
        html += f"""
            <a href="{post['url']}" class="post-entry">
                <h3>{post['title']}</h3>
                <p class="post-summary">{post['summary']}</p>
                <div class="post-meta">
                    <span>DATE // {post['date']}</span>
                    <span class="meta-tag">{post['tag']}</span>
                </div>
            </a>"""
    
    try:
        with open(INDEX_FILE, 'r', encoding='utf-8') as f:
            index_content = f.read()
    except Exception as e:
        logging.error(f"Failed to read {INDEX_FILE}: {e}")
        return

    start_tag = "<!-- POSTS_START -->"
    end_tag = "<!-- POSTS_END -->"
    
    if start_tag not in index_content or end_tag not in index_content:
        logging.error(f"Index placeholders {start_tag} and/or {end_tag} not found in {INDEX_FILE}.")
        return

    pattern = re.compile(f"{start_tag}.*?{end_tag}", re.DOTALL)
    new_content = pattern.sub(f"{start_tag}{html}\n            {end_tag}", index_content)

    try:
        with open(INDEX_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        logging.info(f"Successfully updated {INDEX_FILE}.")
    except Exception as e:
        logging.error(f"Failed to write updates to {INDEX_FILE}: {e}")

def update_readme(posts):
    """
    Updates README.md with markdown links to the latest posts.
    """
    if not os.path.exists(README_FILE):
        logging.warning(f"README file {README_FILE} not found. Skipping README update.")
        return

    # Sort posts by date (newest first)
    posts.sort(key=lambda x: x['date'], reverse=True)
    
    markdown_links = ""
    for post in posts[:10]: # Limit to latest 10 posts
        url = f"https://shadowpbx.github.io/{REPO_NAME}/{post['url']}"
        markdown_links += f"- [{post['title']}]({url})\n"
    
    try:
        with open(README_FILE, 'r', encoding='utf-8') as f:
            readme_content = f.read()
    except Exception as e:
        logging.error(f"Failed to read {README_FILE}: {e}")
        return

    start_tag = "<!-- BLOG-POST-LIST:START -->"
    end_tag = "<!-- BLOG-POST-LIST:END -->"
    
    if start_tag not in readme_content or end_tag not in readme_content:
        start_tag = "<!-- POSTS_START -->"
        end_tag = "<!-- POSTS_END -->"

    if start_tag not in readme_content or end_tag not in readme_content:
        logging.warning(f"Could not find README placeholder tags (either BLOG-POST-LIST or POSTS_START). Skipping README update.")
        return

    pattern = re.compile(f"{start_tag}.*?{end_tag}", re.DOTALL)
    new_content = pattern.sub(f"{start_tag}\n{markdown_links}{end_tag}", readme_content)

    try:
        with open(README_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        logging.info(f"Successfully updated {README_FILE}.")
    except Exception as e:
        logging.error(f"Failed to write updates to {README_FILE}: {e}")

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
    
    # Process all Markdown posts
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

    # Update HTML index
    update_index(all_posts_metadata)
    
    # Update README
    update_readme(all_posts_metadata)
    
    logging.info(f"Build Complete: Processed {len(all_posts_metadata)} posts.")

if __name__ == "__main__":
    main()
