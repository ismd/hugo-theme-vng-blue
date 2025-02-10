document.addEventListener("DOMContentLoaded", function() {
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
    const categoriesEl = document.querySelector('.vg-categories');
    const categoriesList = document.querySelectorAll('.vg-categories-list');
    const categoriesRows = document.querySelectorAll('.vg-categories-row');
    const categoriesPostsList = document.querySelectorAll('.vg-categories-posts-list');
    let categoriesRowSelected = false;

    if (categoriesList?.[0]) {
        // Check if tags are selected in URL
        const url = new URL(window.location.href);
        const urlParams = new URLSearchParams(url.search);
        let urlCategory = urlParams.get('category');

        if (urlCategory) {
            categoriesRows.forEach(row => {
                if (row.dataset.target === urlCategory) {
                    row.classList.add('vg-categories-row_selected');
                    categoriesPostsList.forEach(postsList => {
                        if (postsList.dataset.id === urlCategory) {
                            postsList.classList.add('vg-categories-posts-list_selected')
                            categoriesList[0].classList.add('vg-categories-list_open');
                        } else {
                            postsList.classList.remove('vg-categories-posts-list_selected')
                        }
                    });

                    categoriesRowSelected = true;
                    categoriesEl.classList.add('vg-categories_open');
                }
            });
        }

        categoriesRows.forEach(row => {
            row.addEventListener('click', () => {
                if (!categoriesRowSelected) {
                    row.classList.add('vg-categories-row_selected');

                    categoriesPostsList.forEach(postsList => {
                        if (postsList.dataset.id === row.dataset.target) {
                            postsList.classList.add('vg-categories-posts-list_selected')
                        } else {
                            postsList.classList.remove('vg-categories-posts-list_selected')
                        }
                    });

                    categoriesList[0].classList.add('vg-categories-list_open');
                    categoriesRowSelected = true;
                    urlParams.set('category', row.dataset.target);
                } else {
                    if (row.classList.contains('vg-categories-row_selected')) {
                        row.classList.remove('vg-categories-row_selected');
                        categoriesList[0].classList.remove('vg-categories-list_open');
                        categoriesRowSelected = false;
                        urlParams.delete('category');
                    } else {
                        categoriesRows.forEach(row => row.classList.remove('vg-categories-row_selected'));
                        row.classList.add('vg-categories-row_selected');

                        categoriesPostsList.forEach(postsList => {
                            if (postsList.dataset.id === row.dataset.target) {
                                postsList.classList.add('vg-categories-posts-list_selected')
                            } else {
                                postsList.classList.remove('vg-categories-posts-list_selected')
                            }
                        });

                        urlParams.set('category', row.dataset.target);
                    }
                }

                window.history.replaceState({}, '', `${url.pathname}?${urlParams.toString()}`);
                categoriesEl.classList.toggle('vg-categories_open', categoriesRowSelected);
            });
        });        
    }

    // Tags list page
    const selectedTags = new Set();
    const tagsList = document.querySelectorAll('.vg-tags-list-item');
    const postsList = document.querySelectorAll('.vg-post');

    if (tagsList) {
        // Check if tags are selected in URL
        const url = new URL(window.location.href);
        const urlParams = new URLSearchParams(url.search);
        let urlTags = urlParams.get('tags') ? urlParams.get('tags').split(',') : [];

        if (urlTags.length > 0) {
            tagsList.forEach(tag => {
                const currentTag = tag.getAttribute('data-tag');
                if (urlTags.includes(currentTag)) {
                    tag.classList.add('vg-tags-list-item_active');
                    selectedTags.add(currentTag);
                }
            });

            postsList.forEach(post => {
                const tags = post.getAttribute('data-tags').split(' ');
                const visible = urlTags.every(tag => tags.includes(tag));

                post.classList.toggle('vg-post_visible', visible);
            });
        }

        tagsList.forEach(tag => {
            tag.addEventListener('click', () => {
                tag.classList.toggle('vg-tags-list-item_active');

                const currentTag = tag.getAttribute('data-tag');

                if (selectedTags.has(currentTag)) {
                    selectedTags.delete(currentTag);
                    urlTags = urlTags.filter(t => t !== currentTag);
                } else {
                    selectedTags.add(currentTag);
                    urlTags.push(currentTag);
                }

                if (urlTags.length > 0) {
                    urlParams.set('tags', urlTags.join(','));
                } else {
                    urlParams.delete('tags');
                }

                window.history.replaceState({}, '', `${url.pathname}?${urlParams.toString()}`);

                // Update visible posts
                if (selectedTags.size === 0) {
                    postsList.forEach(post => post.classList.remove('vg-post_visible'));
                    return;
                }

                postsList.forEach(post => {
                    const tags = post.getAttribute('data-tags').split(' ');
                    const visible = Array.from(selectedTags).every(tag => tags.includes(tag));

                    post.classList.toggle('vg-post_visible', visible);
                });
            });
        });
    }
});
