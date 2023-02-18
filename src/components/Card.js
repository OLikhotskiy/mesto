export class Card {
  static selectors = {
    pic: ".element__picture",
    title: ".element__title",
    like: ".element__like",
    likeActive: "element__like_active",
    likeNumber: ".element__likes-number",
    trash: ".element__trash",
    trashHide: "element__trash_hide",
    element: ".element",
    caption: ".popup__image-caption",
    big: ".popup__big-pic",
  };

  constructor(
    cardData,
    userId,
    templateSelector,
    handleOpenImagePopup,
    { handleCardDelete, handleCardLike }
  ) {
    this._card = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._userId = userId;
    this._likesActive = cardData.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleOpenImagePopup;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(Card.selectors.element)
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPic = this._element.querySelector(Card.selectors.pic);
    this._cardLike = this._element.querySelector(Card.selectors.like);
    this._cardTitle = this._element.querySelector(Card.selectors.title);
    this._cardTrash = this._element.querySelector(Card.selectors.trash);
    this._cardPic.src = this._link;
    this._cardPic.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._hangEventListeners();

    if (this._card.owner._id !== this._userId) {
       this._element.querySelector(Card.selectors.trash).classList.add(Card.selectors.trashHide);
     }
    this._likesNumber();
    this.isLiked();
    return this._element;
  }

  deleteCard = () => {
    this._element.remove()
    }

  _likesNumber() {
    this._element.querySelector(Card.selectors.likeNumber).textContent =
      this._likesActive.length;
  }

  addLikes(likesNum) {
    this._likesActive = likesNum;
    this.isLiked();
    this._likesNumber();
  }

  _deleteLikes() {
    return this._likesActive.some((like) => like._id === this._userId);
  }
  isLiked() {
    if (this._deleteLikes()) {
      this._cardLike.classList.add(Card.selectors.likeActive);
      return true;
    } else {
      this._cardLike.classList.remove(Card.selectors.likeActive);
    }
  }

  _hangEventListeners() {
    this._cardLike.addEventListener("click", () => {
      this._handleCardLike(this._card);
    });
    this._cardTrash.addEventListener("click", () => {
      this._handleCardDelete(this._card);
    });
    this._cardPic.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }
}
