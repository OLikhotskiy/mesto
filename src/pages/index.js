import { Card } from "./../components/Card.js";
import { configValidation, initialCards } from "./../utils/data.js";
import { FormValidator } from "./../components/FormValidator.js";
import { Section } from "./../components/Section.js";
import { PopupWithImage } from "./../components/PopupWithImage.js";
import { PopupWithForm } from "./../components/PopupWithForm.js";
import { UserInfo } from "./../components/UserInfo.js";
import {
  popupOpenButtonEditElement,
  popupElementEdit,
  popupInputName,
  popupInputAbout,
  popupOpenButtonAddElement,
  popupElementAdd,
} from "./../utils/constants.js";
import "./../pages/index.css";

const bigCard = new PopupWithImage(".popup_type_image");

const popupEdit = new PopupWithForm(
  ".popup_type_profile-edit",
  handleProfileFormSubmit
);
const popupAdd = new PopupWithForm(".popup_type_add", handleCardFormSubmit);
const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__about",
});
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const newCard = createCard(card);
      cardsSection.addItem(newCard);
    },
  },
  ".elements"
);
const popupProfileValidation = new FormValidator(
  configValidation,
  popupElementEdit
);
const popupAddCardValidation = new FormValidator(
  configValidation,
  popupElementAdd
);

const createCard = function (cardData) {
  const card = new Card(
    cardData.name,
    cardData.link,
    "#element-template",
    handleOpenImagePopup
  );
  const cardElement = card.generateCard();
  return cardElement;
  //cards.addItem(element);
};

function handleOpenImagePopup(name, link) {
  bigCard.open(name, link);
}

function handleProfileFormSubmit(evt, values) {
  evt.preventDefault();
  userInfo.setUserInfo(values.name, values.about);
  popupEdit.close();
}

function handleCardFormSubmit(evt, values) {
  evt.preventDefault();
  const data = {
    name: values.name,
    link: values.link,
  };
  const newCard = createCard(data);
  cardsSection.addItem(newCard);
  popupAdd.close();
}

popupOpenButtonEditElement.addEventListener("click", () => {
  popupProfileValidation.resetValidation();
  popupEdit.open();
  const { name, about } = userInfo.getUserInfo();
  popupInputName.value = name;
  popupInputAbout.value = about;
});

popupOpenButtonAddElement.addEventListener("click", () => {
  popupAddCardValidation.resetValidation();
  popupAdd.open();
});

bigCard.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
cardsSection.renderItems();
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();
