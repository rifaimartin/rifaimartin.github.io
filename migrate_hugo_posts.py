#!/usr/bin/env python3
"""
Script to migrate Hugo blog posts from RSS feed to Jekyll markdown format
"""

import xml.etree.ElementTree as ET
import re
from datetime import datetime
import os
import html

def clean_html_content(html_content):
    """Convert HTML content to cleaner markdown"""
    if not html_content:
        return ""

    # Unescape HTML entities
    content = html.unescape(html_content)

    # Remove CDATA wrappers
    content = re.sub(r'<!\[CDATA\[(.*?)\]\]>', r'\1', content, flags=re.DOTALL)

    # Convert HTML tags to markdown
    content = re.sub(r'<p>(.*?)</p>', r'\1\n\n', content, flags=re.DOTALL)
    content = re.sub(r'<strong>(.*?)</strong>', r'**\1**', content)
    content = re.sub(r'<em>(.*?)</em>', r'*\1*', content)
    content = re.sub(r'<code>(.*?)</code>', r'`\1`', content)

    # Convert blockquotes
    content = re.sub(r'<blockquote>\s*<p>(.*?)</p>\s*</blockquote>', r'> \1\n\n', content, flags=re.DOTALL)
    content = re.sub(r'<blockquote>(.*?)</blockquote>', r'> \1\n\n', content, flags=re.DOTALL)

    # Convert lists
    content = re.sub(r'<ol>\s*', '\n', content)
    content = re.sub(r'</ol>\s*', '\n', content)
    content = re.sub(r'<ul>\s*', '\n', content)
    content = re.sub(r'</ul>\s*', '\n', content)
    content = re.sub(r'<li>(.*?)</li>', r'- \1', content, flags=re.DOTALL)

    # Convert images
    content = re.sub(r'<img src="(.*?)" alt="(.*?)".*?>', r'![\2](\1)', content)

    # Convert links
    content = re.sub(r'<a href="(.*?)".*?>(.*?)</a>', r'[\2](\1)', content)

    # Convert headings
    content = re.sub(r'<h1>(.*?)</h1>', r'# \1\n\n', content)
    content = re.sub(r'<h2>(.*?)</h2>', r'## \1\n\n', content)
    content = re.sub(r'<h3>(.*?)</h3>', r'### \1\n\n', content)

    # Convert line breaks and horizontal rules
    content = re.sub(r'<br\s*/?>', '\n', content)
    content = re.sub(r'<hr\s*/?>', '\n---\n\n', content)

    # Remove remaining HTML tags
    content = re.sub(r'<[^>]+>', '', content)

    # Clean up multiple newlines
    content = re.sub(r'\n{3,}', '\n\n', content)

    # Decode HTML entities again (in case there are nested ones)
    content = html.unescape(content)

    return content.strip()

def create_slug(title):
    """Create URL-friendly slug from title"""
    slug = title.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[\s_-]+', '-', slug)
    slug = re.sub(r'^-+|-+$', '', slug)
    return slug

def parse_rss_and_create_posts(rss_file_path, output_dir):
    """Parse RSS feed and create Jekyll markdown posts"""

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Parse RSS feed
    tree = ET.parse(rss_file_path)
    root = tree.getroot()

    # Find all items (blog posts)
    channel = root.find('channel')
    items = channel.findall('item')

    print(f"Found {len(items)} blog posts to migrate\n")

    for item in items:
        # Extract post data
        title = item.find('title').text
        link = item.find('link').text
        pub_date = item.find('pubDate').text

        # Parse date
        # Format: Sat, 17 Jul 2021 19:32:26 +0700
        date_obj = datetime.strptime(pub_date, '%a, %d %b %Y %H:%M:%S %z')
        date_str = date_obj.strftime('%Y-%m-%d')

        # Get content
        description = item.find('description')
        desc_text = description.text if description is not None else ""

        content_elem = item.find('content')
        if content_elem is not None:
            content_html = content_elem.text
        else:
            content_html = desc_text

        # Clean content
        content_clean = clean_html_content(content_html)

        # Create slug for filename and permalink
        slug = create_slug(title)

        # Create filename: YYYY-MM-DD-title-slug.md
        filename = f"{date_str}-{slug}.md"
        filepath = os.path.join(output_dir, filename)

        # Create Jekyll front matter
        front_matter = f"""---
title: '{title.replace("'", "''")}'
date: {date_str}
permalink: /posts/{date_obj.year}/{date_obj.strftime('%m')}/{slug}/
tags:
  - blog
  - personal
---

"""

        # Write post file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(front_matter)
            f.write(content_clean)

        print(f"[OK] Created: {filename}")
        print(f"  Title: {title}")
        print(f"  Date: {date_str}\n")

    print(f"\n[SUCCESS] Migration complete! Created {len(items)} posts in {output_dir}")

if __name__ == "__main__":
    # Get RSS file from backup branch
    rss_path = "../hugo-backup/posts/index.xml"
    output_path = "_posts"

    if not os.path.exists(rss_path):
        print(f"[ERROR] RSS file not found at {rss_path}")
        print("Please make sure the Hugo backup exists at ../hugo-backup/")
        exit(1)

    parse_rss_and_create_posts(rss_path, output_path)
