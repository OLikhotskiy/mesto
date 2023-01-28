import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{//класс наследник класса Попап
   open(name, link) {//перезапись метода опен
    const popupImage = this._popup.querySelector('.popup__big-pic');
    const popupImageCaption = this._popup.querySelector('.popup__image-caption');
    popupImageCaption.textContent = name;
    popupImage.alt = name;
    popupImage.src = link;
    super.open();
   }
}