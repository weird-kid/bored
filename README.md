# Kernel Tinkering

A personal daily-learning blog built with Jekyll and published through GitHub
Pages.

The goal of this repository is to keep the blog simple: posts are written in
Markdown, images live in the repository, and GitHub Pages handles publishing.
Most notes are about Linux, kernels, filesystems, processes, and related things
I am learning.

Site: <https://weird-kid.github.io/bored/>

## Repository structure

```text
_posts/          Blog posts written in Markdown
_layouts/        Page templates used by Jekyll
assets/css/      Site styling
assets/images/   Images and diagrams used in posts
index.html       Homepage that lists all posts
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
