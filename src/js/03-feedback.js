import throttle from 'lodash.throttle';

const VAULT_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);

let dataForm = JSON.parse(localStorage.getItem(VAULT_KEY)) || {};
reloadPage();

function onInputData() {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(VAULT_KEY, JSON.stringify(dataForm));
}

function reloadPage() {
  email.value = dataForm.email || '';
  message.value = dataForm.message || '';
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert('All fields must be completed');
  }

  localStorage.removeItem(VAULT_KEY);
  event.currentTarget.reset();
  dataForm = {};
}
