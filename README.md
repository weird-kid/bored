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

Post pages have an ASCII box border and ASCII dash underlines beneath their
headings. The wide side margins contain monochrome clouds, birds, balloons,
mountains, trees, and water, with stars and constellations replacing birds and
balloons in the evening and at night. The visitor's local clock automatically
selects a morning (06:00), afternoon (12:00), evening (17:00), or night (21:00)
composition. Light mode shows a sun; dark mode shows a moon, regardless of the
hour. No location permission or external service is used. Without JavaScript,
the morning composition remains, and the borders and underlines still work.
Extra scenery appears in taller windows. Margin art is hidden when there is
less than 8rem of gutter width or 28rem of usable height, and when printing;
the post border and heading underlines remain on small screens.

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
