document.addEventListener("DOMContentLoaded", () => {
    const FADE_DURATION = 500;

    const overlay = document.createElement('div');
    overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;opacity:1;pointer-events:all;transition:opacity ${FADE_DURATION}ms ease;`;
    document.body.appendChild(overlay);

    // Fade in — reveal page
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.pointerEvents = 'none';
        }, FADE_DURATION);
    }, 50);

    // Fade out — leave page
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto')) return;
            e.preventDefault();
            overlay.style.pointerEvents = 'all';
            overlay.style.transition = `opacity ${FADE_DURATION}ms ease`;
            overlay.style.opacity = '1';
            setTimeout(() => {
                window.location.href = href;
            }, FADE_DURATION);
        });
    });

    const loadingScreen = document.querySelector(".loading-screen");
    const gridContainer = document.getElementById("gridContainer");
    const originalItems = Array.from(document.querySelectorAll(".grid-item"));

    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add("hide");
        }, 500);
    }

    if (gridContainer && window.innerWidth > 768) {
        const repeats = 2;
        for (let i = 0; i < repeats; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                gridContainer.appendChild(clone);
            });
        }

        setTimeout(() => {
            const totalWidth = gridContainer.scrollWidth;
            const oneThirdWidth = totalWidth / 3;

            const savedPosition = sessionStorage.getItem("indexScrollPosition");
            if (savedPosition !== null) {
                gridContainer.scrollLeft = parseInt(savedPosition, 10);
            } else {
                gridContainer.scrollLeft = oneThirdWidth;
            }

            let isScrolling = false;
            gridContainer.addEventListener("scroll", () => {
                if (isScrolling) return;
                const scrollPos = gridContainer.scrollLeft;
                if (scrollPos >= oneThirdWidth * 2) {
                    isScrolling = true;
                    gridContainer.scrollLeft = scrollPos - oneThirdWidth;
                    setTimeout(() => isScrolling = false, 50);
                } else if (scrollPos < oneThirdWidth * 0.1) {
                    isScrolling = true;
                    gridContainer.scrollLeft = scrollPos + oneThirdWidth;
                    setTimeout(() => isScrolling = false, 50);
                }
            });
        }, 200);

        gridContainer.addEventListener("wheel", (e) => {
            e.preventDefault();
            gridContainer.scrollLeft += e.deltaY;
        }, { passive: false });

        gridContainer.addEventListener("click", (e) => {
            if (e.target.closest(".project-link")) {
                sessionStorage.setItem("indexScrollPosition", gridContainer.scrollLeft);
            }
        });
    } else if (!gridContainer) {
        const savedPosition = sessionStorage.getItem("indexScrollPosition");
        if (savedPosition !== null) {
            window.scrollTo(0, parseInt(savedPosition, 10));
        }
    }
});