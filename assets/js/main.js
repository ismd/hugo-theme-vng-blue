document.addEventListener("DOMContentLoaded", function() {
    // Theme switcher
    const themeRoot = document.documentElement;
    const themeMeta = document.getElementById('vg-theme-color');
    const themeMq = window.matchMedia('(prefers-color-scheme: dark)');
    const THEMES = ['light', 'dark', 'auto'];

    const resolveTheme = (choice) =>
        choice === 'auto' ? (themeMq.matches ? 'dark' : 'light') : choice;

    const applyTheme = (choice) => {
        const resolved = resolveTheme(choice);
        themeRoot.dataset.theme = choice;
        themeRoot.dataset.themeResolved = resolved;
        if (themeMeta) {
            themeMeta.setAttribute('content', resolved === 'dark' ? '#14253D' : '#3073BB');
        }
        document.querySelectorAll('.vg-theme-switcher').forEach((btn) => {
            btn.setAttribute('aria-label', 'Theme: ' + choice);
        });
    };

    // Re-enable transitions after first paint so the initial theme apply doesn't animate.
    requestAnimationFrame(() => themeRoot.classList.remove('vg-no-transition'));

    document.querySelectorAll('.vg-theme-switcher').forEach((btn) => {
        btn.addEventListener('click', () => {
            const current = themeRoot.dataset.theme || 'auto';
            const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
            try { localStorage.setItem('vg-theme', next); } catch (e) {}
            applyTheme(next);
        });
    });

    themeMq.addEventListener('change', () => {
        if ((themeRoot.dataset.theme || 'auto') === 'auto') {
            applyTheme('auto');
        }
    });

    // Sync aria-label with the theme already applied by the inline init script.
    document.querySelectorAll('.vg-theme-switcher').forEach((btn) => {
        btn.setAttribute('aria-label', 'Theme: ' + (themeRoot.dataset.theme || 'auto'));
    });

    // Hamburger menu
    const hamburger = document.querySelector('.vg-hamburger');
    const sidebar = document.querySelector('.vg-sidebar');
    const body = document.querySelector('body');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            body.classList.toggle('vg-sidebar-open');
            hamburger.classList.toggle('is-active');
            sidebar.classList.toggle('is-active');
        });
    }

    // About page tabs
    const tabs = document.querySelectorAll('.vg-about-extended-info-tabs__tab');
    const tabsContent = document.querySelectorAll('.vg-about-extended-info-tabs__content');

    if (tabs) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(tab => tab.classList.remove('vg-about-extended-info-tabs__tab_active'));
                tab.classList.add('vg-about-extended-info-tabs__tab_active');

                tabsContent.forEach(content => {
                    content.classList.remove('vg-about-extended-info-tabs__content_active');
                    if (content.dataset.tab === tab.dataset.tab) {
                        content.classList.add('vg-about-extended-info-tabs__content_active');
                    }
                });
            });
        });
    }

    // Categories list page
    const categoriesList = document.querySelectorAll('.vg-categories-list');
    const categoriesRows = document.querySelectorAll('.vg-categories-row');

    if (categoriesList) {
        categoriesRows.forEach(row => {
            row.addEventListener('click', (e) => {
                e.preventDefault();

                categoriesRows.forEach(rowAll => {
                    if (rowAll !== row) {
                        rowAll.nextElementSibling.style.height = 0;
                        rowAll.classList.remove('vg-categories-row_open');
                    }
                });

                if (row.classList.contains('vg-categories-row_open')) {
                    row.classList.remove('vg-categories-row_open');
                    row.nextElementSibling.style.height = 0;
                } else {
                    row.nextElementSibling.style.height = row.nextElementSibling.scrollHeight + 'px';
                    row.classList.add('vg-categories-row_open');
                }
            });
        });
    }

    // Tag term page (/tags/linux/) — redirect to /tags/?tags=a,b on second tag click
    const termTagsList = document.querySelector('.vg-tags-list[data-current-tag]');

    if (termTagsList) {
        const currentTag = termTagsList.getAttribute('data-current-tag');
        const tagsBaseUrl = termTagsList.getAttribute('data-tags-url');

        termTagsList.querySelectorAll('.vg-tags-list-item').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const clickedTag = tag.getAttribute('data-tag');
                if (clickedTag === currentTag) return; // follow the link (deselect = reload same page)

                e.preventDefault();
                window.location.href = tagsBaseUrl + '?tags=' + encodeURIComponent(currentTag) + ',' + encodeURIComponent(clickedTag);
            });
        });
    }

    // Tags list page (/tags/ only — with JS filtering)
    const tagsPageList = document.querySelector('.vg-posts-list_toggleable');

    if (tagsPageList) {
        const selectedTags = new Set();
        const tagsList = document.querySelectorAll('.vg-tags-list-item');
        const postsList = tagsPageList.querySelectorAll('.vg-post');
        const tagsBasePath = document.querySelector('.vg-tags-list').getAttribute('data-tags-url');

        // Check if tags are selected in URL (?tags=linux,security)
        const url = new URL(window.location.href);
        const urlParams = new URLSearchParams(url.search);
        const urlTags = urlParams.get('tags') ? urlParams.get('tags').split(',') : [];

        if (urlTags.length > 0) {
            tagsList.forEach(tag => {
                const currentTag = tag.getAttribute('data-tag');
                if (urlTags.includes(currentTag)) {
                    tag.classList.add('vg-tags-list-item_active');
                    selectedTags.add(currentTag);
                }
            });

            filterPosts();
        }

        tagsList.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();

                tag.classList.toggle('vg-tags-list-item_active');

                const currentTag = tag.getAttribute('data-tag');

                if (selectedTags.has(currentTag)) {
                    selectedTags.delete(currentTag);
                } else {
                    selectedTags.add(currentTag);
                }

                // Update URL
                const tags = Array.from(selectedTags);
                if (tags.length === 0) {
                    window.history.replaceState({}, '', tagsBasePath);
                } else if (tags.length === 1) {
                    window.history.replaceState({}, '', tagsBasePath + tags[0] + '/');
                } else {
                    window.history.replaceState({}, '', tagsBasePath + '?tags=' + tags.join(','));
                }

                filterPosts();
            });
        });

        function filterPosts() {
            if (selectedTags.size === 0) {
                postsList.forEach(post => post.classList.remove('vg-post_visible'));
                return;
            }

            postsList.forEach(post => {
                const tags = post.getAttribute('data-tags').split(' ');
                const visible = Array.from(selectedTags).every(tag => tags.includes(tag));

                post.classList.toggle('vg-post_visible', visible);
            });
        }
    }
});
