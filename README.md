# VnG Blue theme for Hugo

[Demo website](https://ismd.github.io/demo-hugo-theme-vng-blue/)

## Features

This theme supports the following features:
- Responsive design
- Home page with different layouts
- Categories and tags
- A lot of social networks icons
- About page

## Installation

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
![Home page with event on top](screenshots/home-full.png)

homeEventPosition: "bottom"
![Home page with event on bottom](screenshots/home-event-bottom.png)

homeEventPosition: "none"
![Home page without event](screenshots/home-no-event.png)

Also you can hide bottom logo on the home page. To do this remove `assets/home-logo-bottom.png` file. It will look like this:

homeEventPosition: "top"
![Home page without bottom logo](screenshots/home-no-bottom-logo.png)

homeEventPosition: "none"
![Home page without bottom logo and event](screenshots/home-no-event-and-bottom-logo.png)

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
