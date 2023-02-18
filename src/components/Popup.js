export class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
  }

  open() {
    this._popup.classList.add("popup_is-open");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_is-open");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        !evt.target.closest(".popup__overlay") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }

  handleProcessing(isSending, buttonText) {
    if (isSending) {
      this._popup.querySelector(".popup__button").textContent = `${buttonText}`;
    } else {
      this._popup.querySelector(".popup__button").textContent = `${buttonText}`;
    }
  }
}
