const backToTopButton = document.getElementById("back-to-top-button");
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});
