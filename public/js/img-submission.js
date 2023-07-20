const btnSvg =
  '<svg height="30" width="30" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#ee3c2f;" d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25 C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0 L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467 L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468 c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467 C19.033,16.725,19.033,17.138,18.78,17.394z"></path> </g> </g></svg>';

// Get the file input element
const fileInput = document.getElementById("dropzone-file");

// Get the image container element
const imageContainer = document.getElementById("image-container");

// Array to store selected files
let selectedFiles = [];

// Listen for changes to the file input
fileInput.addEventListener("change", function () {
  // Remove any existing child elements from the image container
  while (imageContainer.firstChild) {
    imageContainer.removeChild(imageContainer.firstChild);
  }

  // Reset selected files array
  selectedFiles = [];

  // Loop through the selected files
  for (let i = 0; i < fileInput.files.length; i++) {
    const file = fileInput.files[i];

    // Add file to selected files array
    selectedFiles.push(file);

    // Create a new div element to hold the image and remove button
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("relative");

    // Create a new image element
    const img = document.createElement("img");
    img.classList.add("w-full", "h-full", "object-cover");

    // Use FileReader to read the contents of the file
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // Set the image element's src to the data URL
      img.src = reader.result;
    };

    // Create a new button element to remove the image
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = btnSvg;
    removeBtn.classList.add("absolute", "top-0", "right-0", "m-2");

    // Add a click event listener to the remove button
    removeBtn.addEventListener("click", function () {
      // Remove image from the image container
      imgDiv.remove();

      // Remove file from selected files array
      selectedFiles.splice(selectedFiles.indexOf(file), 1);

      // Create a new DataTransfer object and set its files property to the updated selected files array
      const newTransfer = new DataTransfer();
      for (let i = 0; i < selectedFiles.length; i++) {
        newTransfer.items.add(selectedFiles[i]);
      }
      fileInput.files = newTransfer.files;
    });

    // Append the image and remove button elements to the image container
    imgDiv.appendChild(img);
    imgDiv.appendChild(removeBtn);
    imageContainer.appendChild(imgDiv);
  }
});
