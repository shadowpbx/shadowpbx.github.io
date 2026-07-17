#!/usr/bin/env python3
import os
import re
import yaml
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def parse_markdown(md_text):
    # Split metadata from content
    parts = md_text.split('---', 2)
    metadata = {}
    content = ""
    if len(parts) >= 3:
        try:
            metadata = yaml.safe_load(parts[1])
        except Exception as e:
            logging.error(f"Error parsing YAML front-matter: {e}")
        content = parts[2]
    else:
        content = md_text
        
    # Standard Markdown block conversions
    html = content
    
    # 1. Headers
    html = re.sub(r'^### (.*?)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.*?)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^# (.*?)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    
    # 2. Lists
    # Simple list parsing
    html_lines = []
    in_list = False
    for line in html.split('\n'):
        if line.strip().startswith('* ') or line.strip().startswith('- '):
            if not in_list:
                html_lines.append('<ul>')
                in_list = True
            html_lines.append(f'<li>{line.strip()[2:]}</li>')
        else:
            if in_list:
                html_lines.append('</ul>')
                in_list = False
            html_lines.append(line)
    html = '\n'.join(html_lines)
    
    # 3. Inline bold and code
    html = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html)
    html = re.sub(r'`(.*?)`', r'<code>\1</code>', html)
    
    # 4. Paragraph wrapper (crude but useful fallback for simple notes)
    # Split by double newline to form paragraphs
    paras = []
    for block in html.split('\n\n'):
        block = block.strip()
        if block and not block.startswith('<h') and not block.startswith('<ul') and not block.startswith('<li') and not block.startswith('</ul'):
            paras.append(f'<p>{block}</p>')
        else:
            paras.append(block)
    html = '\n\n'.join(paras)
    
    return metadata, html

def build_academics():
    root = os.path.dirname(os.path.abspath(__file__))
    posts_dir = os.path.join(root, "_posts")
    output_dir = os.path.join(root, "posts")
    os.makedirs(output_dir, exist_ok=True)
    
    # Read post template
    template_path = os.path.join(root, "post_template.html")
    with open(template_path, "r", encoding="utf-8") as f:
        template = f.read()
        
    compiled_posts = []
    
    # Parse posts
    if os.path.exists(posts_dir):
        for fn in sorted(os.listdir(posts_dir), reverse=True):
            if fn.endswith(".md"):
                fp = os.path.join(posts_dir, fn)
                with open(fp, "r", encoding="utf-8") as f:
                    md_text = f.read()
                    
                meta, html_body = parse_markdown(md_text)
                
                title = meta.get("title", fn[:-3].replace("-", " ").title())
                date = meta.get("date", "2026.07.16")
                tags = meta.get("tags", ["STUDY"])
                summary = meta.get("summary", html_body[:180].replace("<p>", "").replace("</p>", "") + "...")
                
                # Injects into template
                post_html = template.replace("{{ title }}", title).replace("{{ date }}", str(date)).replace("{{ content }}", html_body)
                
                out_fn = fn.replace(".md", ".html")
                out_fp = os.path.join(output_dir, out_fn)
                
                with open(out_fp, "w", encoding="utf-8") as f:
                    f.write(post_html)
                
                logging.info(f"Generated post: posts/{out_fn}")
                
                # Record metadata for index list
                compiled_posts.append({
                    "href": f"posts/{out_fn}",
                    "title": title,
                    "summary": summary,
                    "date": str(date).replace("-", "."),
                    "tag": tags[0] if tags else "STUDY"
                })
                
    # Update Academics index.html list
    index_path = os.path.join(root, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        index_content = f.read()
        
    posts_list_html = []
    for post in compiled_posts:
        entry = f"""            <a href="{post['href']}" class="post-entry">
                <h3>{post['title']}</h3>
                <p class="post-summary">{post['summary']}</p>
                <div class="post-meta">
                    <span>DATE // {post['date']}</span>
                    <span class="meta-tag">{post['tag']}</span>
                </div>
            </a>"""
        posts_list_html.append(entry)
        
    joined_posts = "\n".join(posts_list_html)
    
    # Replace content between placeholder tags
    placeholder_pattern = re.compile(r'<!-- POSTS_START -->.*?<!-- POSTS_END -->', re.DOTALL)
    new_placeholder = f"<!-- POSTS_START -->\n{joined_posts}\n            <!-- POSTS_END -->"
    
    if placeholder_pattern.search(index_content):
        index_content = placeholder_pattern.sub(new_placeholder, index_content)
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(index_content)
        logging.info("Successfully updated Academics/index.html.")
    else:
        logging.warning("POSTS placeholders not found in index.html.")

if __name__ == "__main__":
    build_academics()
