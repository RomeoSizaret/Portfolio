document.addEventListener("DOMContentLoaded", () => {
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