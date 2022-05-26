class FormValidator {
    constructor(data, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._inputs = Array.from(this._formSelector.querySelectorAll(this._inputSelector) );
        this._button = this._formSelector.querySelector(this._submitButtonSelector);
    }

    _showError = (input, errorMessageText) => {
        const errorMessage = this._formSelector.querySelector(`#${input.name}-error`);
        errorMessage.textContent = errorMessageText;
        errorMessage.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
    }

    _hideError = (input) => {
        const errorMessage = this._formSelector.querySelector(`#${input.name}-error`);
        errorMessage.textContent = ' ';
        errorMessage.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
    }

    _hasInvalidInput = () => {
        return this._inputs.some( (element) => !element.validity.valid); 
    }

    _toggleButtonError = () => {
      if (this._hasInvalidInput() ) {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.disabled = true;
      } else {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.disabled = false;
      }
    }

    _checkIfInputValid = (input) => {
        if (!input.validity.valid) {
            this._showError(input, input.validationMessage);
        } else {
            this._hideError(input);
        }
    }

    _setInputListeners = () => {
        this._toggleButtonError();
        this._inputs.forEach( (input) => {
            input.addEventListener('input', () => {
                this._checkIfInputValid(input);
                this._toggleButtonError();
            });
        });
    }


    enableValidtaion = () => {
        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setInputListeners();
    }

    clearValidation = () => {
        this._toggleButtonError();
        this._formSelector.reset();
        this._inputs.forEach((input) => {
            this._hideError(input);
        });
    }

}

export default FormValidator