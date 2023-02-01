import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImage = this._popup.querySelector(".popup__big-pic");
    this._popupImageCaption = this._popup.querySelector(
      ".popup__image-caption"
    );
  }
  open(name, link) {
    this._popupImageCaption.textContent = name;
    this._popupImage.alt = name;
    this._popupImage.src = link;
    super.open();
  }
}
