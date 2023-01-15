export class FormValidator {
  constructor(configValidation, formElement) {
    this._inputSelector = configValidation.inputSelector;
    this._submitButtonSelector = configValidation.submitButtonSelector;
    this._inactiveButtonClass = configValidation.inactiveButtonClass;
    this._inputErrorClass = configValidation.inputErrorClass;
    this._errorClass = configValidation.errorClass;
    this._form = formElement;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submit = this._form.querySelector(this._submitButtonSelector);
  };

  _checkInputValidity = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      this._hideError(input, error);
    } else {
      this._showError(input, error);
    };

  };

  _hideError(input, error) {
    error.textContent = '';
    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  };

  _showError(input, error) {
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  };

  toggleSubmitButtonState = () => {
    const isFormValid = this._inputList.every(input => input.validity.valid);
    if (isFormValid) {
      this._submit.classList.remove(this._inactiveButtonClass);
      this._submit.disabled = false;
    } else {
      this._submit.classList.add(this._inactiveButtonClass);
      this._submit.disabled = true;
    };
  };

  _hangEventListener = () => {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleSubmitButtonState();
      });
    });
  };

  enableValidation = () => {
    this._hangEventListener();
  };

  resetValidation = () => {
    this._inputList.forEach(input => {
      const error = this._form.querySelector(`#${input.id}-error`);
      this._hideError(input, error);
      this.toggleSubmitButtonState();
    })
  };
} 