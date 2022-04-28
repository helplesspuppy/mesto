
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_visible');
  };

  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__input-error_visible');
    errorElement.textContent = '';
  };

  function hasInvalidInput(inputList) {

    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  function toggleButtonState(inputList,buttonElement)  {
    if (hasInvalidInput(inputList)) {
     // сделай кнопку неактивной
     buttonElement.classList.add('popup__submit-button_inactive');
     buttonElement.setAttribute('disabled', 'disabled');
   } else {
     // иначе сделай кнопку активной
     buttonElement.classList.remove('popup__submit-button_inactive');
     buttonElement.removeAttribute('disabled', 'disabled');
   }
 }

 function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');
     toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         toggleButtonState(inputList, buttonElement);
        checkInputValidity(formElement, inputElement);
      });
    });
  };

  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form-set')); 
      fieldsetList.forEach((fieldset) => {
        setEventListeners(fieldset);
      })
    });
  };
  
  enableValidation({
    formElement: '.popup__form', //+
    inputElement: '.popup__input',//+
    buttonElement: '.popup__submit-button',//+
    inactiveButtonClass: 'popup__submit-button_inactive',//+
    inputErrorClass: 'popup__input_error', //+
    errorClass: 'popup__input-error_visible'  // добавил свой класс
  });
  
  
  
  
  