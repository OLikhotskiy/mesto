export class Card {
  static selectors = {
    pic: ".element__picture",
    title: ".element__title",
    like: ".element__like",
    likeActive: "element__like_active",
    trash: ".element__trash",
    element: ".element",
    caption: ".popup__image-caption",
    big: ".popup__big-pic",
  };

  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(Card.selectors.element)
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardPic = this._card.querySelector(Card.selectors.pic);
    this._cardLike = this._card.querySelector(Card.selectors.like);
    this._cardTitle = this._card.querySelector(Card.selectors.title);
    this._cardTrash = this._card.querySelector(Card.selectors.trash);

    this._cardPic.src = this._link;
    this._cardPic.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._hangEventListeners();

    return this._card;
  }

  _likeCard() {
    this._cardLike.classList.toggle(Card.selectors.likeActive);
  }

  _deleteCard() {
    this._card.remove();
  }

  _hangEventListeners() {
    this._cardLike.addEventListener("click", () => {
      this._likeCard();
    });
    this._cardTrash.addEventListener("click", () => {
      this._deleteCard();
    });
    this._cardPic.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }
}
