document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.querySelector(".loading-screen");
    const gridContainer = document.querySelector(".grid-container");
    
    // Restore scroll position and hide loading screen
    const savedPosition = sessionStorage.getItem("indexScrollPosition");
    if (savedPosition !== null) {
        gridContainer.scrollLeft = parseInt(savedPosition);
    }
    
    // Hide loading screen immediately after scroll position is restored
    loadingScreen.classList.add("hide");
});

const gridContainer = document.querySelector(".grid-container");
const projectLinks = document.querySelectorAll(".project-link");

// Enable horizontal scrolling with mouse wheel only on desktop
gridContainer.addEventListener("wheel", (e) => {
  // Check if we're on mobile (max-width: 768px)
  if (window.innerWidth > 768) {
    e.preventDefault();
    gridContainer.scrollLeft += e.deltaY;
  }
});

// Save scroll position when clicking on project links
projectLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const scrollPosition = gridContainer.scrollLeft;
    sessionStorage.setItem("indexScrollPosition", scrollPosition);
  });
});

// Restore scroll position when page loads
window.addEventListener("load", () => {
  const savedPosition = sessionStorage.getItem("indexScrollPosition");
  if (savedPosition !== null) {
    gridContainer.scrollLeft = parseInt(savedPosition);
  }
});

// Save scroll position periodically while scrolling
let scrollTimeout;
gridContainer.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    sessionStorage.setItem("indexScrollPosition", gridContainer.scrollLeft);
  }, 100);
});
