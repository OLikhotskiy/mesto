import {initialCards} from './cards.js';
import {configValidation, disableSubmitButton} from './validate.js';

const popupElementEdit = document.querySelector('.popup_type_profile-edit');
const popupElementAdd = document.querySelector('.popup_type_add');
const popupElementImage = document.querySelector('.popup_type_image');

const popupCrossButtons = document.querySelectorAll('.popup__close');

const popupFormEdit = popupElementEdit.querySelector('.popup__form_edit');
const popupInputName = popupFormEdit.querySelector('.popup__input_type_name');
const popupInputAbout = popupFormEdit.querySelector('.popup__input_type_about');
const popupFormAdd = popupElementAdd.querySelector('.popup__form_add');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const popupOpenButtonEditElement = document.querySelector('.profile__edit');
const popupOpenButtonAddElement = document.querySelector('.profile__add');

const cardContainer = document.querySelector(".elements");
const inputTitle = document.querySelector('[name="popup-input-type-title"]');
const inputPicture = document.querySelector('[name="popup-input-type-picture"]');

const popupImageCaption = document.querySelector('.popup__image-caption');
const popupImage = document.querySelector('.popup__big-pic');
const cardTemplate = document.querySelector('#element-tamplate').content.querySelector('.element');

const popupArray = Array.from(document.querySelectorAll('.popup'));

const popupAddButton = popupElementAdd.querySelector(configValidation.submitButtonSelector);


const openPopupEdit = function() {
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
  openPopup(popupElementEdit);
};

const openPopupAdd = function() {
  disableSubmitButton(popupAddButton, configValidation);
  openPopup(popupElementAdd);
  popupFormAdd.reset()
};

const openImageClick = (evt) => {
  popupImage.src = evt.target.src;
  popupImageCaption.textContent = popupImage.alt = evt.target.closest('.element__picture').alt;
  openPopup(popupElementImage);
};

const handleDeleteCard = (evt) => {
  evt.target.closest('.element').remove();
};

const handleLikeCard = (evt) => {
  evt.target.closest('.element__like').classList.toggle('element__like_active');
};

const renderCard = (contentCard) => {
  cardContainer.prepend(createCard(contentCard));
};

const createCard = (contentCard) => {
  const defaultCardMassive = cardTemplate.cloneNode(true);
  const link = defaultCardMassive.querySelector('.element__picture');
  link.src = contentCard.link;
  const name = defaultCardMassive.querySelector('.element__title');
  name.textContent = link.alt = contentCard.name;

  const delButton = defaultCardMassive.querySelector('.element__trash');
  delButton.addEventListener('click', handleDeleteCard);

  const likeButton = defaultCardMassive.querySelector('.element__like');
  likeButton.addEventListener('click', handleLikeCard);

  link.addEventListener('click', openImageClick);

  return defaultCardMassive;
};

const handleSubmitAddCardForm = (evt) => {
  evt.preventDefault();
  renderCard({ name: inputTitle.value, link: inputPicture.value });
  evt.target.reset();
  closePopup(popupElementAdd);
};

popupCrossButtons.forEach((button) => {
  const popupButton = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popupButton));
});

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
  const openPopup = document.querySelector('.popup_is-open');
  closePopup(openPopup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_is-open');
  document.addEventListener('keyup', closeByEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_is-open');
  document.removeEventListener('keyup', closeByEscape);
};

popupArray.forEach((overlay) => {
  overlay.addEventListener('click', (evt) => {
    if (!evt.target.closest('.popup__overlay')) {
      closePopup(evt.target.closest('.popup_is-open'));
    }
  })
});

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  closePopup(popupElementEdit);
};

popupOpenButtonEditElement.addEventListener('click', openPopupEdit);
popupOpenButtonAddElement.addEventListener('click', openPopupAdd);
popupFormEdit.addEventListener('submit', handleEditFormSubmit);
popupFormAdd.addEventListener('submit', handleSubmitAddCardForm);

initialCards.forEach((contentCard) => {
  renderCard(contentCard);
});