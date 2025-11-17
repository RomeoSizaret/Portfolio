document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.querySelector(".loading-screen");
    const gridContainer = document.getElementById("gridContainer");
    const originalItems = Array.from(document.querySelectorAll(".grid-item"));

    // Hide loading screen
    setTimeout(() => {
        loadingScreen.classList.add("hide");
    }, 500);

    if (window.innerWidth > 768) {
        // Triple the content for infinite scroll
        const repeats = 2; // Creates 3 total sets (original + 2 copies)
        for (let i = 0; i < repeats; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                gridContainer.appendChild(clone);
            });
        }

        // Calculate widths after content is loaded
        setTimeout(() => {
            const totalWidth = gridContainer.scrollWidth;
            const oneThirdWidth = totalWidth / 3;

            // Set initial scroll position (middle third or saved position)
            const savedPosition = sessionStorage.getItem("indexScrollPosition");
            if (savedPosition !== null) {
                gridContainer.scrollLeft = parseInt(savedPosition, 10);
            } else {
                gridContainer.scrollLeft = oneThirdWidth;
            }

            // Infinite scroll handler with debounce
            let isScrolling = false;
            gridContainer.addEventListener("scroll", () => {
                if (isScrolling) return;
                
                const scrollPos = gridContainer.scrollLeft;
                
                // Jump back when reaching the end of the second set
                if (scrollPos >= oneThirdWidth * 2) {
                    isScrolling = true;
                    gridContainer.scrollLeft = scrollPos - oneThirdWidth;
                    setTimeout(() => isScrolling = false, 50);
                } 
                // Jump forward when reaching the beginning
                else if (scrollPos < oneThirdWidth * 0.1) {
                    isScrolling = true;
                    gridContainer.scrollLeft = scrollPos + oneThirdWidth;
                    setTimeout(() => isScrolling = false, 50);
                }
            });
        }, 200);

        // Manual horizontal scroll via wheel
        gridContainer.addEventListener("wheel", (e) => {
            e.preventDefault();
            gridContainer.scrollLeft += e.deltaY;
        }, { passive: false });

        // Save scroll position when clicking any project link
        gridContainer.addEventListener("click", (e) => {
            if (e.target.closest(".project-link")) {
                sessionStorage.setItem("indexScrollPosition", gridContainer.scrollLeft);
            }
        });
    } else {
        // Mobile: just restore scroll if any
        const savedPosition = sessionStorage.getItem("indexScrollPosition");
        if (savedPosition !== null) {
            window.scrollTo(0, parseInt(savedPosition, 10));
        }
    }
});
