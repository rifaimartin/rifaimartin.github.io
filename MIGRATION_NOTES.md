# Migration Notes - Hugo to Jekyll

## Migration Summary

Successfully migrated from Hugo to Jekyll using the academicpages template on **November 22, 2025**.

### What Was Done

1. **Backup Created**
   - Original Hugo site backed up to branch: `backup-hugo-site`
   - Local backup also created in: `../hugo-backup/`

2. **Template Installation**
   - Cloned academicpages Jekyll template
   - Replaced all Hugo files with Jekyll template

3. **Configuration**
   - Updated `_config.yml` with personal information:
     - Name: Muhammad Rifai
     - Bio: "Computer Science ~ Learning to develop is a life changing experience"
     - Repository: rifaimartin/rifaimartin.github.io
     - GitHub: rifaimartin
     - LinkedIn: rifaimartin

4. **Clean Setup**
   - Removed example blog posts
   - Removed example publications, talks, teaching materials
   - Ready for custom content

## Next Steps

### 1. Setup Local Development Environment

Install Ruby and Jekyll to test locally:

```bash
# Install Ruby (if not installed)
# Windows: Download from https://rubyinstaller.org/
# Mac: brew install ruby
# Linux: sudo apt-get install ruby-full

# Install Bundler
gem install bundler

# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Open browser to http://localhost:4000
```

### 2. Customize Content

#### Update About Page
Edit `_pages/about.md` with your personal information.

#### Add Profile Picture
Replace `images/profile.png` with your own photo.

#### Create Blog Posts
Create new posts in `_posts/` with format: `YYYY-MM-DD-title.md`

Example:
```markdown
---
title: 'My First Jekyll Post'
date: 2024-11-22
permalink: /posts/2024/11/my-first-post/
tags:
  - jekyll
  - blog
---

Your content here...
```

#### Customize Navigation
Edit `_data/navigation.yml` to modify menu items.

### 3. Content Migration (Optional)

If you want to migrate old Hugo blog posts:

1. Find original Hugo markdown files (should be in backup)
2. Convert Hugo front matter to Jekyll format
3. Copy to `_posts/` with proper naming

### 4. GitHub Pages Deployment

The site should automatically deploy via GitHub Pages:

1. Go to repository Settings → Pages
2. Ensure source is set to "Deploy from a branch"
3. Branch should be: `master` / `/ (root)`
4. Wait ~5 minutes for deployment
5. Visit: https://rifaimartin.github.io

### 5. Remove Unused Collections (Optional)

Since this is mainly a blog, you might want to remove:
- `_publications/` - Delete example publications
- `_talks/` - Delete example talks
- `_teaching/` - Delete example teaching materials
- `_portfolio/` - Delete example portfolio items

Or keep them if you plan to use these features!

### 6. Customize Further

- **Theme**: Change `site_theme` in `_config.yml` (options: "default", "air")
- **Social Links**: Update in `_config.yml` under `author:` section
- **Analytics**: Add Google Analytics in `_config.yml` if needed
- **Comments**: Enable Disqus or other comment system in `_config.yml`

## Useful Commands

```bash
# Development server with live reload
bundle exec jekyll serve --livereload

# Build site only
bundle exec jekyll build

# Clean built files
bundle exec jekyll clean
```

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Academicpages Guide](https://github.com/academicpages/academicpages.github.io)
- [Markdown Syntax](https://www.markdownguide.org/basic-syntax/)

## Rollback Instructions

If you need to rollback to Hugo:

```bash
# Switch to backup branch
git checkout backup-hugo-site

# Or create new branch from backup
git checkout -b restore-hugo backup-hugo-site
git push origin restore-hugo
```

## Notes

- Old Hugo posts were in `posts/` directory (now deleted)
- Hugo used different front matter format than Jekyll
- Original images were in `posts/images/` (may need to be recovered from backup)
