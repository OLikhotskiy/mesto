import { Card } from './Card.js';
import { configValidation, initialCards } from './data.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

import './../pages/index.css'

const popupOpenButtonEditElement = document.querySelector('.profile__edit');
const popupElementEdit = document.querySelector('.popup_type_profile-edit');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

const popupOpenButtonAddElement = document.querySelector('.profile__add');
const popupElementAdd = document.querySelector('.popup_type_add');

const createCard = function (item) {
  const card = new Card(item.name, item.link, '#element-template', handleCardClick);
  const element = card.generateCard();
  cards.addItem(element);
};

function handleCardClick(name, link) {
  bigCard.open(name, link);
};

function handleProfileFormSubmit(evt, values) {
  evt.preventDefault();
  userInfo.setUserInfo(values.name, values.about)
  editPopup.close();
}

function handleCardFormSubmit(evt, values) {
  evt.preventDefault();
  const data = {
    name: values.name,
    link: values.link
  }
  createCard(data)
  addPopup.close();
};

popupOpenButtonEditElement.addEventListener('click', () => {
  popupProfileValidation.resetValidation();
  editPopup.open();
  const { name, about } = userInfo.getUserInfo();
  popupInputName.value = name
  popupInputAbout.value = about

});

popupOpenButtonAddElement.addEventListener('click', () => {
  popupAddCardValidation.resetValidation();
  addPopup.open();
});

const bigCard = new PopupWithImage('.popup_type_image');
bigCard.setEventListeners();
const editPopup = new PopupWithForm('.popup_type_profile-edit', handleProfileFormSubmit)
editPopup.setEventListeners()
const addPopup = new PopupWithForm('.popup_type_add', handleCardFormSubmit)
addPopup.setEventListeners()
const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__about' })
const cards = new Section({ items: initialCards, renderer: createCard }, '.elements')
cards.renderCard();

const popupProfileValidation = new FormValidator(configValidation, popupElementEdit);
const popupAddCardValidation = new FormValidator(configValidation, popupElementAdd);
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();