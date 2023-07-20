const carouselNextButton = document.getElementById("data-carousel-next");
const carouselPrevButton = document.getElementById("data-carousel-prev");
const carouselItems = document.getElementsByClassName("carousel-item");

let currentIndex = 0;
const numberOfItems = carouselItems.length;

// Function to show current item and hide all others
function showCurrentItem() {
  for (let i = 0; i < numberOfItems; i++) {
    const carouselItem = carouselItems[i];
    if (i === currentIndex) {
      carouselItem.classList.add("active");
    } else {
      carouselItem.classList.remove("active");
    }
  }
}

// Show or hide carousel buttons depending on number of images
if (numberOfItems <= 1) {
  carouselNextButton.style.display = "none";
  carouselPrevButton.style.display = "none";
} else {
  carouselNextButton.style.display = "block";
  carouselPrevButton.style.display = "block";
}

// Next button click handler
carouselNextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % numberOfItems;
  showCurrentItem();
});

// Previous button click handler
carouselPrevButton.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = numberOfItems - 1;
  }
  showCurrentItem();
});

// Show initial item
showCurrentItem();

// Add fade animation to carousel
const carouselItem = document.querySelector(".carousel-item");
carouselItem.style.position = "absolute";
carouselItem.style.top = "0";
carouselItem.style.left = "0";
carouselItem.style.opacity = "0";
carouselItem.style.transition = "opacity 0.5s ease-out";

carouselItem.classList.add("active");
carouselItem.style.opacity = "1";
