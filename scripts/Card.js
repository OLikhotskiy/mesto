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

  constructor(name, link, templateSelector, openBigCard) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._openBigCard = openBigCard;
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(Card.selectors.element).cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._elementPic = this._element.querySelector(Card.selectors.pic);
    this._elementLike = this._element.querySelector(Card.selectors.like);
    this._elementTitle = this._element.querySelector(Card.selectors.title);
    this._elementTrash = this._element.querySelector(Card.selectors.trash);

    this._elementPic.src = this._link;
    this._elementPic.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._hangEventListeners();

    return this._element;
  };

  _likeCard() {
    this._elementLike.classList.toggle(Card.selectors.likeActive);
  };

  _deleteCard() {
    this._element.remove();
  };

  _hangEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._likeCard();
    });
    this._elementTrash.addEventListener('click', () => {
      this._deleteCard();
    });
    this._elementPic.addEventListener('click', () => this._openBigCard(this._name, this._link));
  };
}