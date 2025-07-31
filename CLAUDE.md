# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo theme called "VnG Blue" - a responsive blog theme designed for Hugo static sites. The theme supports categories, tags, customizable home page layouts, and extensive social media integration.

## Development Commands

Since this is a Hugo theme (not a site), there are no build commands. Development typically involves:

```bash
# Create a demo site to test theme changes
hugo new site demo-site
cd demo-site
git submodule add https://github.com/ismd/hugo-theme-vng-blue.git themes/vng-blue

# Start Hugo development server (from the demo site)
hugo server -D --bind 0.0.0.0
```

For SVG optimization:
```bash
# Uses svgo.config.js configuration
npx svgo assets/icons/
```

## Architecture

### Hugo Theme Structure
- `layouts/`: Hugo template files
  - `_default/baseof.html`: Base template with responsive layout and sidebar logic
  - `_default/home.html`: Home page with configurable event positioning
  - `partials/`: Reusable template components (header, footer, sidebar, etc.)
- `assets/`: Theme assets that get processed by Hugo
  - `css/main.css`: Main stylesheet with CSS custom properties
  - `js/main.js`: Interactive features (hamburger menu, tabs, tag filtering)
  - `icons/`: SVG icons including extensive social media collection
- `static/`: Static files served directly
- `archetypes/`: Content templates

### Home Page Configuration
The theme supports three home page layouts controlled by `homeEventPosition` parameter:
- `"top"`: Event content at top of page
- `"bottom"`: Event content at bottom of page  
- `"none"`: No event content

### Key Features
- **Responsive Design**: Mobile-first approach with hamburger menu
- **Social Integration**: 25+ social media icons in `assets/icons/social/`
- **Tag Filtering**: JavaScript-powered tag filtering on tags page with URL state
- **HiDPI Support**: Theme expects 2x resolution images for optimal display
- **Image Requirements**:
  - Home logos: `home-logo-top.png` (1600x530), `home-logo-bottom.png` (2080x470)
  - Site logo: `logo.png` (320x100), sidebar logo: `logo-sidebar.png` (440x440 min)

### CSS Architecture
Uses CSS custom properties for theming:
- `--main-color`: Primary blue (#367DCB)
- `--main-font`: Montserrat font family
- `--secondary-font`: Iosevka Web font family

### JavaScript Features
- Hamburger menu toggle for mobile navigation
- Tab system for about page
- Collapsible categories list
- Tag filtering with URL parameter persistence

## File Conventions

- HTML templates use Hugo templating syntax with `.Site.Params` for configuration
- CSS follows BEM-like naming: `vg-component__element_modifier`
- JavaScript uses modern ES6+ features with DOM event listeners
- SVG icons are optimized with current color support for theming

## Configuration Notes

Theme requires Hugo extended version 0.123.0+ as specified in `config.toml`. Key configuration parameters should be set in site's `config.yaml/toml`:
- `homeEventPosition`: Controls home page layout
- `homeToBlogText`: Customizes blog link text
