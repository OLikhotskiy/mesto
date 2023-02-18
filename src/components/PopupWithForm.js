import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selectorPopup, handleSubmit) {
    super(selectorPopup);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    this._button = this._popup.querySelector(".popup__button");
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      const name = input.name;
      const value = input.value;
      values[name] = value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setIsLoading(buttonText) {
    this._button.textContent = `${buttonText}`;
  }
}
