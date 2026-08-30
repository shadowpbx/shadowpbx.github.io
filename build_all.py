#!/usr/bin/env python3
import os
import sys
import re
import yaml
import markdown
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Configuration map for all monorepo sections
FOLDER_CONFIGS = {
    "cybersecurity": {"type": "standard", "default_tag": "PENTEST"},
    "cybersecurity/cybersecurity_certifications": {"type": "standard", "default_tag": "CERT"},
    "cybersecurity/cybersecurity_curriculum": {"type": "standard", "default_tag": "STUDY", "layout": "featured"},
    "cybersecurity/cybersecurity_study_modules": {"type": "standard", "default_tag": "MODULES"},
    "cybersecurity/cybersecurity_audio": {"type": "standard", "default_tag": "AUDIO"},
    "cybersecurity/cybersecurity_tools": {"type": "tools"},
    "engineering": {"type": "standard", "default_tag": "ENGINEERING"},
    "engineering/engineering_cs": {"type": "standard", "default_tag": "ALGORITHMS"},
    "engineering/engineering_audio": {"type": "standard", "default_tag": "AUDIO"},
    "engineering/engineering_articles": {"type": "standard", "default_tag": "ENGINEERING"},
    "engineering/engineering_tools": {"type": "standard", "default_tag": "UTILITIES"},
    "academics/academics_curriculum": {"type": "standard", "default_tag": "CURRICULUM"},
    "academics": {"type": "academics_readmes"}
}

# Inlined template for Academics README files
ACADEMICS_README_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} Documentation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/global.css">
    <style>
        .readme-container {
            max-width: 750px;
            margin: 3rem auto;
            padding: 0 1.5rem;
            font-family: var(--font-main);
            color: var(--text-primary);
            line-height: 1.7;
        }
        
        .readme-container h1 {
            font-size: 1.8rem;
            font-weight: 700;
            border-bottom: 2px solid var(--border);
            padding-bottom: 0.5rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
        }
        
        .readme-container h2 {
            font-size: 1.4rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
            letter-spacing: -0.01em;
            color: var(--text-primary);
        }
        
        .readme-container h3 {
            font-size: 1.15rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        
        .readme-container hr {
            border: 0;
            height: 1px;
            background: var(--border);
            margin: 2.5rem 0;
        }
        
        .readme-container ul {
            margin: 1rem 0;
            padding-left: 1.5rem;
        }
        
        .readme-container ul li {
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
        }
        
        .readme-container pre {
            background: var(--bg-header);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1.25rem;
            margin: 1.5rem 0;
            overflow-x: auto;
        }
        
        pre {
            margin: 0;
        }
        
        code {
            font-family: var(--font-mono);
            font-size: 0.9rem;
        }
        
        .readme-container :not(pre) > code {
            background: var(--bg-header);
            border: 1px solid var(--border);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.85rem;
            color: var(--accent);
        }
        
        .readme-container a {
            color: var(--accent);
            text-decoration: none;
            font-weight: 500;
        }
        
        .readme-container a:hover {
            text-decoration: underline;
        }
    
        /* Fix mobile horizontal scrolling overflow issues */
        body {
            overflow-x: hidden;
        }
        
        pre[class*="language-"] {
            overflow-x: auto !important;
        }

        @media (max-width: 768px) {
            .breadcrumb-nav {
                padding: 0.5rem 0.75rem;
            }
            :not(pre) > code {
                white-space: normal !important;
                word-break: break-all !important;
            }
            main table {
                display: block;
                overflow-x: auto;
                white-space: nowrap;
            }
        }
    </style>
</head>
<body>

    <header class="terminal-header">
        <div class="header-container">
            <button id="mobile-menu-btn" class="mobile-menu-toggle">[ ☰ menu --list ]</button>
            <nav class="nav-container">
                <a href="/" class="nav-link">[ HOME ]</a>
                <div class="dropdown">
                    <a href="/cybersecurity/" class="nav-link">[ CYBERSECURITY ]</a>
                    <div class="dropdown-menu">
                        <a href="/cybersecurity/cybersecurity_audio/">Audio Tutorials</a>
                        <a href="/cybersecurity/cybersecurity_tools/">Tools & Scripts</a>
                        <a href="/cybersecurity/cybersecurity_certifications/">Certifications</a>
                        <a href="/cybersecurity/cybersecurity_curriculum/">Cybersecurity Curriculum</a>
                        <a href="/cybersecurity/cybersecurity_study_modules/">Study Modules</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="/engineering/" class="nav-link">[ ENGINEERING ]</a>
                    <div class="dropdown-menu">
                        <a href="/engineering/engineering_audio/">Audio Tutorials</a>
                        <a href="/engineering/engineering_cs/">Computer Science</a>
                        <a href="/engineering/engineering_articles/">Articles & Guides</a>
                        <a href="/engineering/engineering_tools/">Tools & Utilities</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="/academics/" class="nav-link active">[ ACADEMICS ]</a>
                    <div class="dropdown-menu">
                        <a href="/academics/academics_audio/">Audio Tutorials</a>
                        <a href="/academics/academics_curriculum/">Academic Curriculum</a>
                    </div>
                </div>
<a href="/resume/" class="nav-link">[ RESUME ]</a>
                <a href="https://github.com/shadowpbx" class="nav-link" target="_blank">[ GITHUB ]</a>
            </nav>
            <div class="terminal-prompt">user@hexdef: ~/academics/{folder_lowercase} $ cat README.md</div>
            <h1>{title}</h1>
        </div>
    </header>

    <div class="readme-container">
        {body}
        
        <footer style="margin-top: 5rem;">
            &copy; 2026 // TANVIR HUSSAIN // SYSTEMS & SECURITY
        </footer>
    </div>

    <script>
        const menuBtn = document.getElementById('mobile-menu-btn');
        const navContainer = document.querySelector('.nav-container');
        
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.classList.toggle('expanded');
            if (isExpanded) {
                menuBtn.textContent = '[ ✕ close ]';
                navContainer.classList.add('show');
            } else {
                menuBtn.textContent = '[ ☰ menu --list ]';
                navContainer.classList.remove('show');
            }
        });
    </script>
</body>
</html>
"""

def parse_markdown(content_text):
    """Parses YAML front matter and compiles remaining markdown text into HTML."""
    parts = re.split(r'---', content_text, 2)
    metadata = {}
    content = ""
    if len(parts) >= 3:
        try:
            metadata = yaml.safe_load(parts[1])
        except Exception as e:
            logging.error(f"Failed to parse YAML front matter: {e}")
        content = parts[2]
    else:
        content = content_text
        
    try:
        html = markdown.markdown(content, extensions=['fenced_code', 'tables'])
    except Exception as e:
        logging.error(f"Failed to convert markdown: {e}")
        html = content
        
    return metadata, html

def clean_date_format(date_val):
    """Converts date strings or datetime objects to clean YYYY.MM.DD."""
    try:
        if isinstance(date_val, str):
            return date_val.replace('-', '.')
        return date_val.strftime('%Y.%m.%d')
    except Exception:
        return "2026.01.01"

def update_readme_list(readme_path, posts, folder_name):
    """Updates README.md file in standard directories with markdown post links."""
    if not os.path.exists(readme_path):
        return
        
    posts.sort(key=lambda x: x['date'], reverse=True)
    markdown_links = ""
    for post in posts[:10]:
        url = f"https://shadowpbx.github.io/{folder_name}/{post['url']}"
        markdown_links += f"- [{post['title']}]({url})\n"
        
    try:
        with open(readme_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        logging.error(f"Failed to read {readme_path}: {e}")
        return

    start_tag = "<!-- BLOG-POST-LIST:START -->"
    end_tag = "<!-- BLOG-POST-LIST:END -->"
    
    if start_tag not in content or end_tag not in content:
        start_tag = "<!-- POSTS_START -->"
        end_tag = "<!-- POSTS_END -->"
        
    if start_tag in content and end_tag in content:
        pattern = re.compile(f"{start_tag}.*?{end_tag}", re.DOTALL)
        new_content = pattern.sub(f"{start_tag}\n{markdown_links}{end_tag}", content)
        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        logging.info(f"Successfully updated README.md list in {folder_name}.")

def compile_standard_section(folder_path, folder_name, config):
    """Compiles typical posts from _posts into posts/ and builds index list."""
    posts_dir = os.path.join(folder_path, "_posts")
    output_dir = os.path.join(folder_path, "posts")
    index_file = os.path.join(folder_path, "index.html")
    template_file = os.path.join(folder_path, "post_template.html")
    readme_file = os.path.join(folder_path, "README.md")
    
    if not os.path.exists(posts_dir):
        return
        
    os.makedirs(output_dir, exist_ok=True)
    
    try:
        with open(template_file, 'r', encoding='utf-8') as f:
            template_content = f.read()
    except Exception as e:
        logging.error(f"Failed to read template in {folder_name}: {e}")
        return
        
    compiled_posts = []
    
    for fn in os.listdir(posts_dir):
        if fn.endswith(".md"):
            fp = os.path.join(posts_dir, fn)
            try:
                with open(fp, 'r', encoding='utf-8') as f:
                    md_text = f.read()
            except Exception as e:
                logging.error(f"Failed to read post {fn} in {folder_name}: {e}")
                continue
                
            meta, html_body = parse_markdown(md_text)
            
            title = meta.get("title", fn[:-3].replace("-", " ").title())
            date_val = meta.get("date", "")
            if not date_val:
                date_match = re.match(r'(\d{4}-\d{2}-\d{2})', fn)
                date_val = date_match.group(1) if date_match else "2026-01-01"
                
            clean_date = clean_date_format(date_val)
            
            # Determine tags
            tag = meta.get('tag') or meta.get('category') or meta.get('tags')
            if isinstance(tag, list):
                tag = tag[0] if tag else None
            if not tag:
                tag = config["default_tag"]
            tag = str(tag).upper()
            
            # Summary snippet
            summary = meta.get("summary", "")
            if not summary:
                summary = re.sub('<[^<]+?>', '', html_body)[:150]
                summary = summary.replace('\n', ' ').strip() + "..."
                
            direct_link = meta.get("direct_link", "")
            if direct_link:
                post_href = direct_link
                logging.info(f"Skipping compilation for direct link in {folder_name}: {direct_link}")
            else:
                out_fn = fn.replace(".md", ".html")
                out_fp = os.path.join(output_dir, out_fn)
                post_href = f"posts/{out_fn}"
                
                chapter_num_val = str(meta.get("chapter_num", "99"))
                slug = fn.replace(".md", "").lower().replace("_", "-")
                slug = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', slug)
                slug = slug.replace("master-index-of-", "").replace("-master-index", "").replace("the-", "")
                slug = re.sub(r'^-+|-+$', '', slug)
                
                folder_base = os.path.basename(folder_name)
                if folder_base == "cybersecurity_curriculum":
                    if chapter_num_val != "99":
                        chap_padded = chapter_num_val.zfill(2)
                        terminal_prompt_str = f"user@hexdef: ~/cybersecurity/curriculum $ cat chap-{chap_padded}.md"
                    else:
                        terminal_prompt_str = f"user@hexdef: ~/cybersecurity/curriculum $ cat {slug}.md"
                elif folder_base == "engineering_cs":
                    terminal_prompt_str = f"user@hexdef: ~/engineering/cs $ cat {slug}.md"
                elif folder_base == "engineering_articles":
                    terminal_prompt_str = f"user@hexdef: ~/engineering/articles $ cat {slug}.md"
                elif folder_base == "engineering_tools":
                    terminal_prompt_str = f"user@hexdef: ~/engineering/tools $ cat {slug}.md"
                elif folder_base == "academics_curriculum":
                    if "cybersecurity" in slug:
                        short_name = "cybersecurity-syllabus.md"
                    elif "electrical" in slug or "electronic" in slug or "eee" in slug:
                        short_name = "eee-syllabus.md"
                    elif "cs" in slug:
                        short_name = "cs-syllabus.md"
                    else:
                        short_name = f"{slug}.md"
                    terminal_prompt_str = f"user@hexdef: ~/academics/curriculum $ cat {short_name}"
                elif folder_base == "cybersecurity":
                    terminal_prompt_str = f"user@hexdef: ~/cybersecurity/posts $ cat {slug}.md"
                else:
                    terminal_prompt_str = f"user@hexdef: ~/{folder_name} $ cat {fn}"
                
                # Replace content in templates
                post_html = template_content.replace("{{ title }}", title)\
                                            .replace("{{ content }}", html_body)\
                                            .replace("{{ date }}", clean_date)\
                                            .replace("{{ terminal_prompt }}", terminal_prompt_str)
                with open(out_fp, "w", encoding="utf-8") as f:
                    f.write(post_html)
                logging.info(f"Generated HTML post: {post_href}")
                
            compiled_posts.append({
                "url": post_href,
                "title": title,
                "summary": summary,
                "date": clean_date,
                "tag": tag,
                "chapter_num": str(meta.get("chapter_num", "99")),
                "is_macroview": meta.get("is_macroview", False) or meta.get("hide_from_index", False)
            })
            
    # Sort posts & prepare HTML items
    folder_base = os.path.basename(folder_name)
    if folder_base == "cybersecurity_curriculum":
        chapter_posts = [p for p in compiled_posts if p['chapter_num'] != "99"]
        chapter_posts.sort(key=lambda x: x['chapter_num'])
        ref_posts = [p for p in compiled_posts if p['chapter_num'] == "99"]
        ref_posts.sort(key=lambda x: x['title'], reverse=True)
        
        posts_list_html = []
        for post in chapter_posts:
            entry = f"""            <a href="{post['url']}" class="curriculum-card">
                <div>
                    <div class="curriculum-card-num">CHAPTER {post['chapter_num']}</div>
                    <div class="curriculum-card-title">{post['title']}</div>
                    <p class="curriculum-card-desc">{post['summary']}</p>
                </div>
            </a>"""
            posts_list_html.append(entry)
        joined_posts = "\n".join(posts_list_html)
        
        specialized_posts = [p for p in ref_posts if not any(k in p['url'] for k in ["bedrock", "defensive-security", "offensive-security", "governance-risk", "security-architecture", "adversary-emulation", "audited-dfir"])]
        specialized_posts.sort(key=lambda x: (x['date'], x['title']), reverse=True)
        ref_list_html = []
        for post in specialized_posts:
            ref_entry = f"""                <li class="specialized-item">
                    <a href="{post['url']}">
                        <span class="prefix" style="font-family: var(--font-mono); color: #e11d48; font-weight: 700; margin-right: 0.5rem;">&gt;</span> {post['title']}
                    </a>
                </li>"""
            ref_list_html.append(ref_entry)
        joined_ref = "\n".join(ref_list_html)
    elif folder_base == "academics_curriculum":
        feed_posts = [p for p in compiled_posts if not p.get("is_macroview")]
        feed_posts.sort(key=lambda x: x['date'], reverse=True)
        posts_list_html = []
        for post in feed_posts:
            tag_name = post.get('tag', 'CURRICULUM')
            title_upper = post['title'].upper()
            card_class = "macro-card macro-accent"
            if "CYBERSECURITY" in title_upper or "SECURITY" in title_upper:
                card_class = "macro-card macro-blue"
            elif "ELECTRICAL" in title_upper or "ELECTRONIC" in title_upper:
                card_class = "macro-card macro-yellow"
            elif "COMPUTER" in title_upper or "SYSTEMS" in title_upper:
                card_class = "macro-card macro-accent"
            elif "FOUNDATION" in tag_name.upper():
                card_class = "macro-card macro-foundation"
            
            entry = f"""            <a href="{post['url']}" class="{card_class}">
                <div>
                    <div class="macro-badge">{tag_name}</div>
                    <h3 class="macro-title">{post['title']}</h3>
                    <p class="macro-desc">{post['summary']}</p>
                </div>
            </a>"""
            posts_list_html.append(entry)
        joined_posts = "\n".join(posts_list_html)
    else:
        feed_posts = [p for p in compiled_posts if not p.get("is_macroview")]
        feed_posts.sort(key=lambda x: x['date'], reverse=True)
        posts_list_html = []
        layout = config.get("layout", "standard")
        for post in feed_posts:
            if layout == "featured":
                entry = f"""            <a href="{post['url']}" class="study-card featured-card">
                    <div>
                        <h3>CURRICULUM // {post['tag']}</h3>
                        <div class="study-card-title">{post['title']}</div>
                        <p class="study-card-desc">{post['summary']}</p>
                    </div>
                </a>"""
            else:
                entry = f"""            <a href="{post['url']}" class="post-entry">
                    <h3>{post['title']}</h3>
                    <p class="post-summary">{post['summary']}</p>
                    <div class="post-meta">
                        <span class="meta-tag">{post['tag']}</span>
                    </div>
                </a>"""
            posts_list_html.append(entry)
        
        if not posts_list_html and folder_base == "engineering_cs":
            joined_posts = '            <div style="color: var(--text-secondary); font-style: italic; font-size: 0.95rem; padding: 0.75rem 0;">Additional deep dive modules and computational guides in development.</div>'
        else:
            joined_posts = "\n".join(posts_list_html)
        joined_ref = ""
    
    # Overwrite index.html placeholders
    if os.path.exists(index_file):
        try:
            with open(index_file, 'r', encoding='utf-8') as f:
                index_content = f.read()
        except Exception as e:
            logging.error(f"Failed to read index in {folder_name}: {e}")
            return
            
        placeholder_pattern = re.compile(r'<!-- POSTS_START -->.*?<!-- POSTS_END -->', re.DOTALL)
        if placeholder_pattern.search(index_content):
            new_placeholder = f"<!-- POSTS_START -->\n{joined_posts}\n            <!-- POSTS_END -->"
            index_content = placeholder_pattern.sub(new_placeholder, index_content)
            
        if folder_name == "cybersecurity_curriculum":
            ref_pattern = re.compile(r'<!-- REFERENCE_START -->.*?<!-- REFERENCE_END -->', re.DOTALL)
            if ref_pattern.search(index_content):
                new_ref = f"<!-- REFERENCE_START -->\n{joined_ref}\n                        <!-- REFERENCE_END -->"
                index_content = ref_pattern.sub(new_ref, index_content)

        with open(index_file, 'w', encoding='utf-8') as f:
            f.write(index_content)
        logging.info(f"Successfully updated index.html for {folder_name}.")
            
    # Update README markdown lists
    update_readme_list(readme_file, compiled_posts, folder_name)

def update_tools_list_page(file_path, posts):
    """Writes tools page items list inside POSTS placeholders."""
    if not os.path.exists(file_path):
        return
        
    posts_html = ""
    for post in posts:
        posts_html += f"""
            <a href="{post['url']}" class="post-entry">
                <h3>{post['title']}</h3>
                <p class="post-summary">{post['summary']}</p>
                <div class="post-meta">
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
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        logging.info(f"Successfully updated list page: {os.path.basename(file_path)}")

def compile_tools_section(folder_path):
    """Specialized compiler for Cybersecurity_Tools."""
    posts_dir = os.path.join(folder_path, "_posts")
    output_dir = os.path.join(folder_path, "posts")
    index_file = os.path.join(folder_path, "index.html")
    template_file = os.path.join(folder_path, "post_template.html")
    
    if not os.path.exists(posts_dir):
        return
        
    os.makedirs(output_dir, exist_ok=True)
    
    try:
        with open(template_file, 'r', encoding='utf-8') as f:
            template_content = f.read()
    except Exception as e:
        logging.error(f"Failed to read tools template: {e}")
        return
        
    all_posts = []
    
    for fn in os.listdir(posts_dir):
        if fn.endswith(".md"):
            fp = os.path.join(posts_dir, fn)
            try:
                with open(fp, 'r', encoding='utf-8') as f:
                    md_text = f.read()
            except Exception as e:
                continue
                
            meta, html_body = parse_markdown(md_text)
            
            title = meta.get("title", fn[:-3].replace("-", " ").title())
            date_val = meta.get("date", "")
            if not date_val:
                date_match = re.match(r'(\d{4}-\d{2}-\d{2})', fn)
                date_val = date_match.group(1) if date_match else "2026-01-01"
            clean_date = clean_date_format(date_val)
            
            track = meta.get('track', 'Script')
            track = str(track).strip().capitalize()
            if track not in ['Script', 'Tool']:
                track = 'Script'
                
            category = meta.get('category') or 'General'
            category = str(category).strip().capitalize()
            
            tag = meta.get('tag') or meta.get('category') or meta.get('tags')
            if isinstance(tag, list):
                tag = tag[0] if tag else None
            if not tag:
                tag = "PYTHON" if "python" in title.lower() else "BASH"
            tag = str(tag).upper()
            
            summary = meta.get("summary", "")
            if not summary:
                summary = re.sub('<[^<]+?>', '', html_body)[:150]
                summary = summary.replace('\n', ' ').strip() + "..."
                
            direct_link = meta.get("direct_link", "")
            if direct_link:
                post_href = direct_link
            else:
                out_fn = fn.replace(".md", ".html")
                out_fp = os.path.join(output_dir, out_fn)
                post_href = f"posts/{out_fn}"
                
                post_html = template_content.replace("{{ title }}", title).replace("{{ content }}", html_body).replace("{{ date }}", clean_date)
                with open(out_fp, "w", encoding="utf-8") as f:
                    f.write(post_html)
                    
            all_posts.append({
                "url": post_href,
                "title": title,
                "summary": summary,
                "date": clean_date,
                "tag": tag,
                "track": track,
                "category": category
            })
            
    # Sort posts newest-first
    all_posts.sort(key=lambda x: x['date'], reverse=True)
    
    # Filter script/tool categories
    cyber_scripts = [p for p in all_posts if p['track'] == 'Script' and p['category'] == 'Cybersecurity']
    cyber_tools = [p for p in all_posts if p['track'] == 'Tool' and p['category'] == 'Cybersecurity']
    all_scripts = [p for p in all_posts if p['track'] == 'Script']
    all_tools = [p for p in all_posts if p['track'] == 'Tool']
    
    # Update lists pages
    update_tools_list_page(os.path.join(folder_path, 'cybersecurity_scripts.html'), cyber_scripts)
    update_tools_list_page(os.path.join(folder_path, 'cybersecurity_tools.html'), cyber_tools)
    update_tools_list_page(os.path.join(folder_path, 'all_scripts.html'), all_scripts)
    update_tools_list_page(os.path.join(folder_path, 'all_tools.html'), all_tools)
    
    # Update index.html counters
    if os.path.exists(index_file):
        try:
            with open(index_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            content = re.sub(r'<!-- CYBER_SCRIPTS_COUNT -->.*?<!-- CYBER_SCRIPTS_COUNT_END -->', f'<!-- CYBER_SCRIPTS_COUNT -->{len(cyber_scripts)}<!-- CYBER_SCRIPTS_COUNT_END -->', content)
            content = re.sub(r'<!-- CYBER_TOOLS_COUNT -->.*?<!-- CYBER_TOOLS_COUNT_END -->', f'<!-- CYBER_TOOLS_COUNT -->{len(cyber_tools)}<!-- CYBER_TOOLS_COUNT_END -->', content)
            content = re.sub(r'<!-- ALL_SCRIPTS_COUNT -->.*?<!-- ALL_SCRIPTS_COUNT_END -->', f'<!-- ALL_SCRIPTS_COUNT -->{len(all_scripts)}<!-- ALL_SCRIPTS_COUNT_END -->', content)
            content = re.sub(r'<!-- ALL_TOOLS_COUNT -->.*?<!-- ALL_TOOLS_COUNT_END -->', f'<!-- ALL_TOOLS_COUNT -->{len(all_tools)}<!-- ALL_TOOLS_COUNT_END -->', content)
            
            with open(index_file, 'w', encoding='utf-8') as f:
                f.write(content)
            logging.info(f"Successfully updated dashboard file counters in {os.path.basename(index_file)}.")
        except Exception as e:
            logging.error(f"Failed to update dashboard counters: {e}")

def compile_academics_readmes(folder_path):
    """Specialized compiler for Academics course README files."""
    targets = [
        ("academics_audio/01 American Government", "american_government", "American Government"),
        ("academics_audio/02 Macroeconomics", "macroeconomics", "Macroeconomics"),
        ("academics_audio/03 Sociology", "sociology", "Sociology"),
        ("academics_audio/04 CISS 100", "ciss100", "CISS 100: Introduction to Computing"),
        ("macroeconomics_graphs", "macroeconomics_graphs", "Macroeconomics Graphs")
    ]
    print("Compiling README.md files into HTML...")
    
    for sub_rel, folder_key, title in targets:
        sub_folder_path = os.path.join(folder_path, sub_rel)
        readme_path = os.path.join(sub_folder_path, "README.md")
        dest_html = os.path.join(sub_folder_path, "readme.html")
        
        if os.path.exists(readme_path):
            print(f"Compiling {readme_path} -> {dest_html}...")
            with open(readme_path, "r", encoding="utf-8") as f:
                md_content = f.read()
                
            # Strip YAML if present
            if md_content.startswith('---'):
                parts = md_content.split('---', 2)
                if len(parts) >= 3:
                    md_content = parts[2]
                    
            parsed_html = markdown.markdown(md_content, extensions=['fenced_code', 'tables'])
            
            prompt_path = f"~/academics/{folder_key}"
            html_page = ACADEMICS_README_TEMPLATE.replace("{title}", title).replace("{body}", parsed_html).replace("{folder_lowercase}", folder_key)
            with open(dest_html, "w", encoding="utf-8") as f:
                f.write(html_page)
            print("-> Generated.")
        else:
            print(f"README.md not found in {sub_folder_path}.")

def build_all():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Parse command line arguments to check for targeted compile
    args = sys.argv[1:]
    if args:
        target_folders = []
        for arg in args:
            if arg in FOLDER_CONFIGS:
                target_folders.append(arg)
            else:
                logging.warning(f"Target folder '{arg}' is not configured in build pipeline. Ignoring.")
        if not target_folders:
            logging.error("No valid target folders specified. Exiting build.")
            return
        logging.info(f"Starting Targeted Website Build for: {', '.join(target_folders)}")
        active_folders = [(f, FOLDER_CONFIGS[f]) for f in target_folders]
    else:
        logging.info("Starting Global Website Build...")
        active_folders = FOLDER_CONFIGS.items()
    
    for folder, config in active_folders:
        folder_path = os.path.join(root_dir, folder)
        if not os.path.exists(folder_path):
            logging.warning(f"Folder directory {folder_path} does not exist. Skipping.")
            continue
            
        logging.info(f"Compiling section: {folder}...")
        
        if config["type"] == "standard":
            compile_standard_section(folder_path, folder, config)
            logging.info(f"Successfully compiled standard section: {folder}")
        elif config["type"] == "tools":
            compile_tools_section(folder_path)
            logging.info(f"Successfully compiled tools section: {folder}")
        elif config["type"] == "academics_readmes":
            compile_academics_readmes(folder_path)
            logging.info(f"Successfully compiled academics READMEs section: {folder}")
            
    logging.info("Website Build Complete!")

if __name__ == "__main__":
    build_all()
