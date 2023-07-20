const form = document.querySelector("#register-form-submit");
const inputs = document.querySelectorAll(".register-input");
const error = document.querySelector(".err-msg");

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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  inputs.forEach((input) => {
    input.value = input.value.trim();
    if (!input.value) {
      input.style.borderBottom = "1px solid #f56565";
      error.textContent = "Something is missing!";
    } else {
      input.style.borderBottom = "1px solid #38a169";
    }
  });

  const isValid = Array.from(inputs).every((input) => input.value);

  if (isValid) {
    form.submit();
  }
});
