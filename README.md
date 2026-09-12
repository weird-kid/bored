# Just Interesting Things

A personal journal for recording the interesting things I think about,
try, and learn each day. Built with Jekyll and
published through GitHub Pages.

The goal is to do and document interesting things consistently. Posts are
written in Markdown, images live in the repository, and GitHub Pages handles
publishing. Topics follow whatever catches my curiosity, from technical
projects to hobbies and everyday discoveries.

Site: <https://weird-kid.github.io/bored/>

## Repository structure

```text
_posts/          Blog posts written in Markdown
_layouts/        Page templates used by Jekyll
assets/css/      Site styling
assets/images/   Images and diagrams used in posts
assets/js/       Browser-side enhancements
index.html       Homepage that lists all posts
about.html       About page and profile links
_config.yml      Jekyll and GitHub Pages configuration
BLOGGING.md      Practical writing workflow guide
```

Post pages show sparse, monochrome ASCII sky art in wide side margins. The
visitor's local clock selects a morning (06:00), afternoon (12:00), evening
(17:00), or night (21:00) composition. Light mode shows a sun; dark mode shows
a moon, regardless of the hour. No location permission or external service is
used. Without JavaScript, the morning composition remains. Art is hidden when
the margins are too narrow and when printing.

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
