export class FormValidator {
  constructor(configValidation, formElement) {
    this._formSelector = configValidation.formSelector;
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
      this._noError(input, error);
    } else {
      this._error(input, error);
    };
    this._resetMessage(input, error);
  };

  _noError(input, error) {
    error.textContent = '';
    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  };

  _error(input, error) {
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  };

  _disableButton = () => {
    const isFormValid = this._inputList.every(input => input.validity.valid);
    if (isFormValid) {
      this._submit.classList.remove(this._inactiveButtonClass);
      this._submit.disabled = '';
    } else {
      this._submit.classList.add(this._inactiveButtonClass);
      this._submit.disabled = 'disabled';
    };
  };

  _resetMessage = (input, error) => {
    const buttonClose = this._form.querySelector('.popup__close');
    buttonClose.addEventListener('click', () => {
      input.classList.remove(this._inputErrorClass);
      error.classList.remove(this._errorClass);
    })
  };

  _hangEventListener = () => {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._disableButton();
      });
    });
  };

  enableValidation = () => {
    this._hangEventListener();
    this._disableButton();
  };
} 