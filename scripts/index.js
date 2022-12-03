const popupElementEdit = document.querySelector('.popup_edit');//+
const popupElementAdd = document.querySelector('.popup_add');//+
const popupElementImage = document.querySelector('.popup_image');//+

const popupCloseButtonElementEdit = document.querySelector('.popup__close_edit');//+
const popupCloseButtonElementAdd = document.querySelector('.popup__close_add');//+
const popupCloseButtonElementImage = document.querySelector('.popup__close_image');//+

const popupFormEdit = popupElementEdit.querySelector('.popup__form_edit');//+
const popupInputName = popupFormEdit.querySelector('.popup__input_type_name');//+
const popupInputAbout = popupFormEdit.querySelector('.popup__input_type_about');//+
const popupFormAdd = popupElementAdd.querySelector('.popup__form_add'); //+ 

const popupInputPicture = popupElementAdd.querySelector('.popup__input_type_picture');
const popupInputTitle = popupElementAdd.querySelector('.popup__input_type_title');


const profileName = document.querySelector('.profile__name');//+
const profileAbout = document.querySelector('.profile__about');//+

const popupOpenButtonEditElement = document.querySelector('.profile__edit');//+
const popupOpenButtonAddElement = document.querySelector('.profile__add');//+
const elementLike = document.querySelectorAll('.element__like');

const cardContainer = document.querySelector(".elements");//+
const inputTitle = document.querySelector('[name="popup-input-type-title"]');
const inputPicture = document.querySelector('[name="popup-input-type-picture"]');

const popupImageCaption = document.querySelector('.popup__image-caption');//+
const popupImage = document.querySelector('.popup__big-pic');//+
const cardTemplate = document.querySelector('#element-tamplate').content.querySelector('.element');//+

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const openPopupEdit = function() {
    popupElementEdit.classList.add('popup_is-open');
    popupInputName.value = profileName.textContent;
    popupInputAbout.value = profileAbout.textContent;
};

const openPopupAdd = function() {
    popupElementAdd.classList.add('popup_is-open');
};

//const openPopupImage = function() {
//  popupElementImage.classList.add('popup_is-open');
//};

const closePopupEdit = function() {
  popupElementEdit.classList.remove('popup_is-open');
};

const closePopupAdd = function() {
    popupElementAdd.classList.remove('popup_is-open');
};

//const closePopupImage = function() {
//  popupElementImage.classList.remove('popup_is-open');
//};

const handleDeleteCard = (evt) => {
  evt.target.closest('.element').remove();//+
}

const handleLikeCard = (evt) => {
  evt.target.closest('.element__like').classList.toggle('element__like_active');
}//+

const renderCard = (contentCard) => {
  cardContainer.prepend(createCard(contentCard));//+
};

const createCard = (contentCard) => {
  const defaultCardMassive = cardTemplate.cloneNode(true);
  const name = defaultCardMassive.querySelector('.element__title');
  name.textContent = contentCard.name;
  const link = defaultCardMassive.querySelector('.element__picture');
  link.src = contentCard.link;
  
  const deleteBtn = defaultCardMassive.querySelector('.element__trash');
  deleteBtn.addEventListener('click', handleDeleteCard);

  const likeBtn = defaultCardMassive.querySelector('.element__like');
  likeBtn.addEventListener('click', handleLikeCard);

  return defaultCardMassive;
};

const handleSubmitAddCardForm = (evt) => {
  evt.preventDefault();
  renderCard({ name: inputTitle.value, link: inputPicture.value });
  evt.target.reset();
  closePopupAdd();
};

function formSubmitHandlerEdit (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    closePopupEdit();
};

popupOpenButtonEditElement.addEventListener('click', openPopupEdit);
popupOpenButtonAddElement.addEventListener('click', openPopupAdd);
popupCloseButtonElementEdit.addEventListener('click', closePopupEdit);
popupCloseButtonElementAdd.addEventListener('click', closePopupAdd);
popupFormEdit.addEventListener('submit', formSubmitHandlerEdit);
popupFormAdd.addEventListener("submit", handleSubmitAddCardForm);



  
 
initialCards.forEach((contentCard) => {
  renderCard(contentCard);
});