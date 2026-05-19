# VnG Blue theme for Hugo

A responsive Hugo blog theme with a perfect Lighthouse score, a flexible home page, and 30+ ready-to-use social network icons.

[Demo website](https://ismd.github.io/demo-hugo-theme-vng-blue/)

![Lighthouse 100/100/100/100 on both desktop and mobile](https://github.com/ismd/hugo-theme-vng-blue/raw/main/images/lighthouse.png)

## Features

- **Perfect Lighthouse score** — 100/100/100/100 across Performance, Accessibility, Best Practices and SEO, on both **desktop and mobile**
- **"Next event" block on the home page** — a built-in section for announcing upcoming events, with three layout options (`top`, `bottom`, `none`)
- **31 social network icons** included out of the box — from mainstream (X, Instagram, LinkedIn, YouTube, GitHub) to niche (Signal, Substack, Threads, WeChat, Viber, VK)
- **Responsive design** with a hamburger menu and HiDPI (2x) image support
- **Tag filtering** on the tags page with URL state — share or bookmark filtered views
- **Categories** with a collapsible sidebar list
- **About page with tabs** for sectioned profile content
- **Giscus comments** on single post pages

## Installation

```bash
git submodule add https://github.com/ismd/hugo-theme-vng-blue.git themes/vng-blue
```

## Configuration

See [demo project configuration](https://github.com/ismd/demo-hugo-theme-vng-blue) for example of configuration.

### Home page

It's possible to configure different styles for the home page. The following parameters are available:

```yaml
homeEventPosition: "top" # "top" or "bottom" or "none"
homeToBlogText: "To&nbsp;blog"
```

#### Screenshots

homeEventPosition: "top"
![Home page with event on top](https://github.com/ismd/hugo-theme-vng-blue/raw/main/images/screenshot.png)

homeEventPosition: "bottom"
![Home page with event on bottom](https://github.com/ismd/hugo-theme-vng-blue/raw/main/images/home-event-bottom.png)

homeEventPosition: "none"
![Home page without event](https://github.com/ismd/hugo-theme-vng-blue/raw/main/images/home-no-event.png)

Also you can hide bottom logo on the home page. To do this remove `assets/home-logo-bottom.png` file. It will look like this:

homeEventPosition: "top"
![Home page without bottom logo](https://github.com/ismd/hugo-theme-vng-blue/raw/main/images/home-no-bottom-logo.png)

homeEventPosition: "none"
![Home page without bottom logo and event](https://github.com/ismd/hugo-theme-vng-blue/raw/main/images/home-no-event-and-bottom-logo.png)

### Comments

The theme supports Giscus comments on single post pages:

```yaml
giscus:
  enable: true
custom_script_inline: |
  <script src="https://giscus.app/client.js"
          data-repo="[ENTER REPO HERE]"
          data-repo-id="[ENTER REPO ID HERE]"
          data-category="[ENTER CATEGORY NAME HERE]"
          data-category-id="[ENTER CATEGORY ID HERE]"
          data-mapping="pathname"
          data-strict="0"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-theme="preferred_color_scheme"
          data-lang="en"
          crossorigin="anonymous"
          async>
  </script>
```

## Images

This theme supports HiDPI displays. It means that you should provide images with double resolution for better quality on HiDPI displays. All sizes below are for HiDPI displays (you should provide images with this resolution).

### Home page

On the home page there're two images: `home-logo-top.png` and `home-logo-bottom.png`. Their sizes can be different but the optimal are:

1. For the top one is 1600x530
2. For the bottom one is 2080x470

### Logos

There're two logos:

1. In the left top corner on every page the size of logo can be any but recommended is 320x100
2. In right sidebar on every page except home the size **must be** at least 440px/440px

Put all of these files in `assets` directory of your site.
