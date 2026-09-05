# OS Exploration

A personal journal for exploring operating systems and recording the
interesting things I think about and learn each day. Built with Jekyll and
published through GitHub Pages.

The goal is to do and document interesting things consistently. Posts are
written in Markdown, images live in the repository, and GitHub Pages handles
publishing. Many entries explore Linux, kernels, filesystems, processes, and
other operating-system topics.

Site: <https://weird-kid.github.io/bored/>

## Repository structure

```text
_posts/          Blog posts written in Markdown
_layouts/        Page templates used by Jekyll
assets/css/      Site styling
assets/images/   Images and diagrams used in posts
index.html       Homepage that lists all posts
about.html       About page and profile links
_config.yml      Jekyll and GitHub Pages configuration
BLOGGING.md      Practical writing workflow guide
```

## Writing posts

Each post is a Markdown file in `_posts/` with a date-based filename:

```text
_posts/YYYY-MM-DD-short-title.md
```

Example:

```md
---
layout: post
title: "Learning About Inodes"
date: 2026-09-04
categories: filesystem
---

Today I learned ...
```

For the full day-to-day workflow, including images, drafts, links, code blocks,
and publishing steps, see [BLOGGING.md](BLOGGING.md).

## Publishing

Changes are published by committing and pushing to GitHub. GitHub Pages builds
the Jekyll site automatically and updates the live blog.
