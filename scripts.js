document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.querySelector(".loading-screen");
    const gridContainer = document.getElementById("gridContainer");
    const projectLinks = document.querySelectorAll(".project-link");
    const originalItems = Array.from(document.querySelectorAll(".grid-item"));

    // Hide loading screen
    loadingScreen.classList.add("hide");

    // Duplicate original set multiple times (5x for example)
    const repeats = 5;
    for (let i = 0; i < repeats; i++) {
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            gridContainer.appendChild(clone);
        });
    }

    // Manual horizontal scroll via wheel
    gridContainer.addEventListener("wheel", (e) => {
        if (window.innerWidth > 768) {
            e.preventDefault();
            gridContainer.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // Save scroll position when clicking a project link
    projectLinks.forEach(link => {
        link.addEventListener("click", () => {
            sessionStorage.setItem("indexScrollPosition", gridContainer.scrollLeft);
        });
    });

    // Restore scroll position on page load
    const savedPosition = sessionStorage.getItem("indexScrollPosition");
    if (savedPosition !== null) {
        gridContainer.scrollLeft = parseInt(savedPosition, 10);
    }
});
