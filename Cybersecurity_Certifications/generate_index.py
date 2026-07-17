#!/usr/bin/env python3
import os
import re
import yaml
import markdown
import logging

def parse_markdown(md_text):
    parts = md_text.split('---', 2)
    metadata = {}
    content = ""
    if len(parts) >= 3:
        try:
            metadata = yaml.safe_load(parts[1])
        except Exception as e:
            logging.error(f"Error parsing YAML: {e}")
        content = parts[2]
    else:
        content = md_text
        
    # Compile markdown to HTML using the python-markdown library
    html = markdown.markdown(content, extensions=['fenced_code', 'tables'])
    
    return metadata, html

def build_certs():
    root = os.path.dirname(os.path.abspath(__file__))
    posts_dir = os.path.join(root, "_posts")
    output_dir = os.path.join(root, "posts")
    os.makedirs(output_dir, exist_ok=True)
    
    template_path = os.path.join(root, "post_template.html")
    with open(template_path, "r", encoding="utf-8") as f:
        template = f.read()
        
    compiled_posts = []
    
    if os.path.exists(posts_dir):
        for fn in sorted(os.listdir(posts_dir), reverse=True):
            if fn.endswith(".md"):
                fp = os.path.join(posts_dir, fn)
                with open(fp, "r", encoding="utf-8") as f:
                    md_text = f.read()
                    
                meta, html_body = parse_markdown(md_text)
                
                title = meta.get("title", fn[:-3].replace("-", " ").title())
                date = meta.get("date", "2026.07.16")
                tags = meta.get("tags", ["CERT"])
                summary = meta.get("summary", html_body[:180].replace("<p>", "").replace("</p>", "") + "...")
                
                post_html = template.replace("{{ title }}", title).replace("{{ date }}", str(date)).replace("{{ content }}", html_body)
                
                out_fn = fn.replace(".md", ".html")
                out_fp = os.path.join(output_dir, out_fn)
                
                with open(out_fp, "w", encoding="utf-8") as f:
                    f.write(post_html)
                
                logging.info(f"Generated certification post: posts/{out_fn}")
                
                compiled_posts.append({
                    "href": f"posts/{out_fn}",
                    "title": title,
                    "summary": summary,
                    "date": str(date).replace("-", "."),
                    "tag": tags[0] if tags else "CERT"
                })
                
    index_path = os.path.join(root, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        index_content = f.read()
        
    posts_list_html = []
    for post in compiled_posts:
        entry = f"""            <a href="{post['href']}" class="post-entry">
                <h3>{post['title']}</h3>
                <p class="post-summary">{post['summary']}</p>
                <div class="post-meta">
                    <span class="meta-tag">{post['tag']}</span>
                </div>
            </a>"""
        posts_list_html.append(entry)
        
    joined_posts = "\n".join(posts_list_html)
    
    placeholder_pattern = re.compile(r'<!-- POSTS_START -->.*?<!-- POSTS_END -->', re.DOTALL)
    new_placeholder = f"<!-- POSTS_START -->\n{joined_posts}\n            <!-- POSTS_END -->"
    
    if placeholder_pattern.search(index_content):
        index_content = placeholder_pattern.sub(new_placeholder, index_content)
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(index_content)
        logging.info("Successfully updated Cybersecurity_Certifications/index.html.")
    else:
        logging.warning("POSTS placeholders not found in index.html.")

if __name__ == "__main__":
    build_certs()
