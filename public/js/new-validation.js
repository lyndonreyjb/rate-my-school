const form = document.querySelector("#form-submit");
const inputs = document.querySelectorAll(".inputs");
const textarea = document.querySelector(".text-area");
const error = document.querySelector(".err-msg");
const dropContainer = document.querySelector(".drop-container");
const imgInput = document.getElementById("dropzone-file");
//image validation
imgInput.addEventListener("change", () => {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  const file = imgInput.files[0];

  if (!allowedExtensions.exec(file.name)) {
    imgInput.value = "";
    dropContainer.style.border = "1px solid #f56565";
    error.textContent = "Invalid file type. Please upload a JPG or PNG image.";
  } else {
    dropContainer.style.border = "1px solid #38a169";
    error.textContent = "";
  }
});
//text area validation
textarea.addEventListener("input", () => {
  if (!textarea.value) {
    textarea.style.border = "1px solid #f56565";
  } else {
    textarea.style.border = "1px solid #38a169";
    error.textContent = " ";
  }
});
//input validation
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.value) {
      input.style.borderBottom = "1px solid #f56565";
    } else {
      input.style.borderBottom = "1px solid #38a169";
    }
    error.textContent = " ";
  });
});
//form validation
form.addEventListener("submit", (event) => {
  event.preventDefault();

  textarea.value = textarea.value.trim();

  inputs.forEach((input) => {
    input.value = input.value.trim();
    if (!input.value) {
      input.style.borderBottom = "1px solid #f56565";
    } else {
      input.style.borderBottom = "1px solid #38a169";
    }
  });

  const isValid = Array.from(inputs).every((input) => input.value);

  if (textarea.value && isValid && imgInput.value) {
    form.submit();
  } else {
    if (!textarea.value) {
      textarea.style.border = "1px solid #f56565";
      error.textContent = "Missing Description";
    }
    if (!imgInput.value) {
      dropContainer.style.border = "1px solid #f56565";
      error.textContent = "Image Missing";
    } else {
      error.textContent = "Missing Inputs";
    }
  }
});
