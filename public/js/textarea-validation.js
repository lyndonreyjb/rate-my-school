const form = document.querySelector("#form-submit");
const error = document.querySelector(".err-msg");
const textarea = document.querySelector(".text-area");

textarea.addEventListener("input", () => {
  if (!textarea.value) {
    textarea.style.border = "1px solid #f56565";
  } else {
    textarea.style.border = "1px solid #38a169";
  }
  error.textContent = " ";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  textarea.value = textarea.value.trim();

  if (!textarea.value) {
    textarea.style.border = "1px solid #f56565";
    error.textContent = "Something is missing!";
  } else {
    textarea.style.border = "1px solid #38a169";
    form.submit();
  }
});
