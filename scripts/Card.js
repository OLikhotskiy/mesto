import { openPopup, popupElementImage } from './index.js';

export class Card {
  static selectors = {
    pic: '.element__picture',
    title: '.element__title',
    like: '.element__like',
    likeActive: 'element__like_active',
    trash: '.element__trash',
    element: '.element',
    caption: '.popup__image-caption',
    big: '.popup__big-pic',
  }

  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(Card.selectors.element).cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(Card.selectors.pic).src = this._link;
    this._element.querySelector(Card.selectors.pic).alt = this._name;
    this._element.querySelector(Card.selectors.title).textContent = this._name;
    this._hangEventListeners();
    return this._element;
  };

  _likeCard() {
    this._element.querySelector(Card.selectors.like).classList.toggle(Card.selectors.likeActive);
  };

  _deleteCard() {
    this._element.querySelector(Card.selectors.trash).closest(Card.selectors.element).remove();
  };

  _openBigCard() {
    openPopup(popupElementImage);
    popupElementImage.querySelector(Card.selectors.caption).textContent = this._name;
    popupElementImage.querySelector(Card.selectors.big).src = this._link;
    popupElementImage.querySelector(Card.selectors.big).alt = this._name;
  };

  _hangEventListeners() {
    this._element.querySelector(Card.selectors.like).addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector(Card.selectors.trash).addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector(Card.selectors.pic).addEventListener('click', () => {
      this._openBigCard();
    });
  };
}