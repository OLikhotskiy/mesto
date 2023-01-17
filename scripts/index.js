import { Card } from './Card.js';
import { configValidation, initialCards } from './data.js';

import { FormValidator } from './FormValidator.js';

const popupElementEdit = document.querySelector('.popup_type_profile-edit');
const popupElementAdd = document.querySelector('.popup_type_add');
const popupElementImage = document.querySelector('.popup_type_image');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const popupFormEdit = popupElementEdit.querySelector('.popup__form_edit');
const popupInputName = popupFormEdit.querySelector('.popup__input_type_name');
const popupInputAbout = popupFormEdit.querySelector('.popup__input_type_about');
const popupFormAdd = popupElementAdd.querySelector('.popup__form_add');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const popupOpenButtonEditElement = document.querySelector('.profile__edit');
const popupOpenButtonAddElement = document.querySelector('.profile__add');

const inputTitle = document.querySelector('[name="popup-input-type-title"]');
const inputPicture = document.querySelector('[name="popup-input-type-picture"]');

const popupArray = Array.from(document.querySelectorAll('.popup'));
const cardElements = document.querySelector('.elements');

const popupImageCaption = document.querySelector('.popup__image-caption');
const popupImage = document.querySelector('.popup__big-pic');

function openPopup(popup) {
  popup.classList.add('popup_is-open');
  document.addEventListener('keyup', closeByEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_is-open');
  document.removeEventListener('keyup', closeByEscape);
};

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-open');
    closePopup(openPopup);
  }
};

popupArray.forEach((overlay) => {
  overlay.addEventListener('click', (evt) => {
    if (!evt.target.closest('.popup__overlay')) {
      closePopup(overlay);
    }
  })
});

const openPopupEdit = function () {
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
  openPopup(popupElementEdit);
  popupProfileValidation.resetValidation();
};

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  closePopup(popupElementEdit);
};

const openPopupAdd = function () {
  openPopup(popupElementAdd);
  popupFormAdd.reset();
  popupAddCardValidation.resetValidation();
};

const openBigCard = (name, link) => {
  popupImage.src = link;
  popupImageCaption.textContent = name;
  popupImage.alt = name;
  openPopup(popupElementImage);
};

const createCard = function (item) {
  const card = new Card(item.name, item.link, '#element-template', openBigCard);
  const element = card.generateCard();
  cardElements.prepend(element);
}

const addNewCard = (evt) => {
  evt.preventDefault();
  const newCard = { name: inputTitle.value, link: inputPicture.value };
  createCard(newCard);
  evt.target.reset();
  closePopup(popupElementAdd);
};

initialCards.forEach((content) => {
  createCard(content);
});

popupCloseButtons.forEach((button) => {
  const popupButton = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popupButton));
});

popupOpenButtonEditElement.addEventListener('click', openPopupEdit);
popupOpenButtonAddElement.addEventListener('click', openPopupAdd);
popupFormEdit.addEventListener('submit', handleEditFormSubmit);
popupFormAdd.addEventListener('submit', addNewCard);

const popupProfileValidation = new FormValidator(configValidation, popupElementEdit);
const popupAddCardValidation = new FormValidator(configValidation, popupElementAdd);
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();