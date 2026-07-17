#!/usr/bin/env python3
import os
import re

clep_root = "/home/shad/Application/Github/shadowpbx.github.io/Academics"

folders = ["Sociology", "Macroeconomics", "Macroeconomics_Graphs", "American_Government"]

# A simple Python Markdown-to-HTML parser using regex
def markdown_to_html(md_text):
    html_lines = []
    in_list = False
    in_code_block = False
    
    # Pre-process blockquotes, horizontal rules, and double newlines
    lines = md_text.split('\n')
    
    for line in lines:
        # Code blocks
        if line.strip().startswith("```"):
            if in_code_block:
                html_lines.append("</code></pre></div>")
                in_code_block = False
            else:
                lang = line.strip().replace("```", "").strip()
                html_lines.append(f'<div class="code-block-container"><pre><code class="language-{lang or "txt"}">')
                in_code_block = True
            continue
            
        if in_code_block:
            # Escape HTML characters in code block
            escaped = line.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
            html_lines.append(escaped)
            continue

        # Horizontal rules
        if line.strip() == "---" or line.strip() == "***":
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append("<hr class='readme-hr'>")
            continue
            
        # Headings
        if line.startswith("# "):
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append(f"<h1 class='readme-h1'>{line[2:].strip()}</h1>")
            continue
        elif line.startswith("## "):
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append(f"<h2 class='readme-h2'>{line[3:].strip()}</h2>")
            continue
        elif line.startswith("### "):
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            html_lines.append(f"<h3 class='readme-h3'>{line[4:].strip()}</h3>")
            continue
            
        # Bullet list items
        stripped = line.strip()
        if stripped.startswith("* ") or stripped.startswith("- "):
            if not in_list:
                html_lines.append("<ul class='readme-ul'>")
                in_list = True
            content = stripped[2:].strip()
            html_lines.append(f"<li>{content}</li>")
            continue
            
        # Standard paragraph or empty line
        if stripped == "":
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            continue
            
        if in_list:
            # If not matching bullet but still in_list, close the list
            html_lines.append("</ul>")
            in_list = False
            
        # Treat as standard paragraph line
        html_lines.append(f"<p>{stripped}</p>")

    if in_list:
        html_lines.append("</ul>")
        
    html_content = "\n".join(html_lines)
    
    # Inline formatting (Bold, code, links)
    # Bold: **text**
    html_content = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html_content)
    # Inline code: `code`
    html_content = re.sub(r'`(.*?)`', r'<code class="readme-inline-code">\1</code>', html_content)
    # Links: [text](url)
    html_content = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2" target="_blank" class="readme-link">\1</a>', html_content)
    
    return html_content

template = """<!DOCTYPE html>
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
        .readme-container {{
            max-width: 750px;
            margin: 3rem auto;
            padding: 0 1.5rem;
            font-family: var(--font-main);
            color: var(--text-primary);
            line-height: 1.7;
        }}
        
        .readme-h1 {{
            font-size: 1.8rem;
            font-weight: 700;
            border-bottom: 2px solid var(--border);
            padding-bottom: 0.5rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
        }}
        
        .readme-h2 {{
            font-size: 1.4rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
            letter-spacing: -0.01em;
            color: var(--text-primary);
        }}
        
        .readme-h3 {{
            font-size: 1.15rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }}
        
        .readme-hr {{
            border: 0;
            height: 1px;
            background: var(--border);
            margin: 2.5rem 0;
        }}
        
        .readme-ul {{
            margin: 1rem 0;
            padding-left: 1.5rem;
        }}
        
        .readme-ul li {{
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
        }}
        
        .code-block-container {{
            background: var(--bg-header);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1.25rem;
            margin: 1.5rem 0;
            overflow-x: auto;
        }}
        
        pre {{
            margin: 0;
        }}
        
        code {{
            font-family: var(--font-mono);
            font-size: 0.9rem;
        }}
        
        .readme-inline-code {{
            background: var(--bg-header);
            border: 1px solid var(--border);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.85rem;
            color: var(--accent);
        }}
        
        .readme-link {{
            color: var(--accent);
            text-decoration: none;
            font-weight: 500;
        }}
        
        .readme-link:hover {{
            text-decoration: underline;
        }}
    
        @media (max-width: 768px) {{
            .readme-container {{
                margin: 1.5rem auto;
                padding: 0 1rem;
            }}
            .terminal-header .header-container {{
                padding: 2rem 1rem;
            }}
            .terminal-header h1 {{
                font-size: clamp(1.6rem, 5vw, 2.2rem) !important;
            }}
            .terminal-header .back-link {{
                margin-bottom: 1rem;
            }}
        }}
    
        
        
        /* Premium Breadcrumb Widget styling */
        .breadcrumb-nav {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 0.5rem 0.85rem;
            border-radius: 6px;
            margin-bottom: 2.5rem;
        }}

        .breadcrumb-left {{
            display: flex;
            align-items: center;
            overflow-x: auto;
            white-space: nowrap;
            scrollbar-width: none; /* Hide scrollbar Firefox */
            -ms-overflow-style: none;  /* Hide scrollbar IE/Edge */
            padding-right: 1rem;
            margin-right: 0.5rem;
            color: var(--text-secondary);
        }}

        .breadcrumb-left::-webkit-scrollbar {{
            display: none; /* Hide scrollbar Chrome/Safari */
        }}

        .breadcrumb-left a, .breadcrumb-right a {{
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
            white-space: nowrap;
        }}

        .breadcrumb-left a:hover, .breadcrumb-right a:hover {{
            color: var(--accent);
            text-decoration: underline;
        }}

        .bc-sep {{
            color: #cbd5e1;
            margin: 0 0.4rem;
            flex-shrink: 0;
        }}

        .breadcrumb-curr {{
            color: var(--text-primary);
            font-weight: 600;
            flex-shrink: 0;
        }}

        .breadcrumb-right {{
            display: flex;
            gap: 1rem;
            flex-shrink: 0;
        }}

        /* Fix mobile horizontal scrolling overflow issues */
        body {{
            overflow-x: hidden;
        }}
        
        pre[class*="language-"] {{
            overflow-x: auto !important;
        }}

        @media (max-width: 768px) {{
            .breadcrumb-nav {{
                padding: 0.5rem 0.75rem;
            }}
            :not(pre) > code {{
                white-space: normal !important;
                word-break: break-all !important;
            }}
            main table {{
                display: block;
                overflow-x: auto;
                white-space: nowrap;
            }}
        }}
    </style>
</head>
<body>

    <header class="terminal-header">
        <div class="header-container">
            <div class="breadcrumb-nav"><div class="breadcrumb-left"><a href="/">~</a> <span class="bc-sep">/</span> <a href="/Academics/">academics</a> <span class="bc-sep">/</span> <a href="/Academics/coursework.html">coursework</a> <span class="bc-sep">/</span> <span class="breadcrumb-curr">{title}</span></div><div class="breadcrumb-right"><a href="/">[ HOME ]</a><a href="/resume/">[ RESUME ]</a></div></div>
            <div class="terminal-prompt">user@hexdef:~$ cat README.md</div>
            <h1>{title}</h1>
        </div>
    </header>

    <div class="readme-container">
        {body}
        
        <footer style="margin-top: 5rem;">
            &copy; 2026 // TANVIR HUSSAIN // SYSTEMS ARCHITECT
        </footer>
    </div>

</body>
</html>
"""

def build_readmes():
    print("Compiling README.md files into HTML...")
    for folder in folders:
        folder_path = os.path.join(clep_root, folder)
        readme_path = os.path.join(folder_path, "README.md")
        dest_html = os.path.join(folder_path, "readme.html")
        
        if os.path.exists(readme_path):
            print(f"Compiling {readme_path} -> {dest_html}...")
            with open(readme_path, "r", encoding="utf-8") as f:
                md_content = f.read()
                
            parsed_html = markdown_to_html(md_content)
            
            # Create a pretty title from the folder name
            clean_title = folder.replace("_", " ").title()
            
            html_page = template.format(title=clean_title, body=parsed_html)
            
            with open(dest_html, "w", encoding="utf-8") as f:
                f.write(html_page)
            print("-> Generated.")
        else:
            print(f"README.md not found in {folder_path}.")
            
    print("README Compilation Complete!")

if __name__ == "__main__":
    build_readmes()
