const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

let formData = {
  email: "",
  message: "",
};

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  formData = JSON.parse(savedData);

  form.elements.email.value = formData.email || "";
  form.elements.message.value = formData.message || "";
}

form.addEventListener("input", event => {
  const fieldName = event.target.name;
  const fieldValue = event.target.value.trim();

  formData[fieldName] = fieldValue;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener("submit", event => {
  event.preventDefault();

  if (formData.email === "" || formData.message === "") {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData = {
    email: "",
    message: "",
  };

  form.reset();
});