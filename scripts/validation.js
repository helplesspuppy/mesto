const showError = (form, input, errorMessageText, errorClass, inputErrorClass) => {
  const errorMessage = form.querySelector(`#${input.name}-error`)
  errorMessage.textContent = errorMessageText
  errorMessage.classList.add(errorClass);
  input.classList.add(inputErrorClass);
}

const hideError = (form, input, errorClass, inputErrorClass) => {
  const errorMessage = form.querySelector(`#${input.name}-error`)
  errorMessage.textContent = ' '
  errorMessage.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
}

const hasInvalidInput = (inputs) => {
 return Array.from(inputs).some( (element) => !element.validity.valid);
}

const toggleButtonError = (inputs, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
}

const checkIfInputValid = (form, input, {inputErrorClass, errorClass }) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, inputErrorClass, errorClass)
  } else {
    hideError(form, input, inputErrorClass, errorClass)
  }
}

const setInputListeners = (form, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest} ) => {
  const inputs = form.querySelectorAll(inputSelector);
  const sumbitButton = form.querySelector(submitButtonSelector);
  toggleButtonError(inputs, sumbitButton, inactiveButtonClass);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkIfInputValid(form, input, rest);
      toggleButtonError(inputs, sumbitButton, inactiveButtonClass);
    });
  });
  
}

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setInputListeners(form, rest);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__data-box',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input-error_visible',
  errorClass: 'popup__data-box_error'
});