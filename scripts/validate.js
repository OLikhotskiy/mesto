const forms = Array.from(document.querySelectorAll('.popup__form'));

const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid){
    error.textContent = ''
    input.classList.remove (config.inputErrorClass);
    error.classList.add (config.errorClass);
    } else {
    error.textContent = input.validationMessage;
    input.classList.add (config.inputErrorClass);
    error.classList.add (config.errorClass);
    };
};

const disableButton = (inputs, button, config) => {
  const isFormValid = inputs.every(input => input.validity.valid);
     
     if (isFormValid) {
       button.disabled = '';
       button.classList.remove(config.inactiveButtonClass);
     } else {
       button.disabled = 'disabled';
       button.classList.add(config.inactiveButtonClass);
     };
};

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  
  forms.forEach(form => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);
    
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    inputs.forEach(input => {
      input.addEventListener('input', () => {
      checkInputValidity(input, config);
      disableButton(inputs, button, config);
      });
    });
});
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
