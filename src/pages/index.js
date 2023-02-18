import { Card } from "./../components/Card.js";
import { configValidation } from "./../utils/data.js";
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
  popupAvatar,
  avatarUpdateButton,
} from "./../utils/constants.js";
import { Api } from "./../components/Api.js";
import { PopupWithConfirmation } from "./../components/PopupWithConfirmation.js";
import "./../pages/index.css";
//
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});
const bigCard = new PopupWithImage(".popup_type_image");
const popupAdd = new PopupWithForm(".popup_type_add", handleAddCardFormSubmit);
const popupEdit = new PopupWithForm(
  ".popup_type_profile-edit",
  handleProfileFormSubmit
);
const newAvatarPopup = new PopupWithForm(
  ".popup_update_avatar",
  handleSubmitChangeAvatarForm
);
const delCardConfirmation = new PopupWithConfirmation(".popup_del_card");
const popupProfileValidation = new FormValidator(
  configValidation,
  popupElementEdit
);
const popupAddCardValidation = new FormValidator(
  configValidation,
  popupElementAdd
);
const popupAvatarValidation = new FormValidator(configValidation, popupAvatar);
const cardsSection = new Section(renderCard, ".elements");
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "2785cf20-4641-41b7-b993-5f3d50ff39ad",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    cardsSection.renderItems(cardsData);
  })
  .catch((err) => console.log(err));

function renderCard(cardsData) {
  cardsSection.addItem(createCard(cardsData));
}

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    userInfo.getUserId(),
    "#element-template",
    handleOpenImagePopup,
    {
      handleCardDelete: () => {
        delCardConfirmation.open();
        delCardConfirmation.setSubmitHandler(() => {
          delCardConfirmation.setIsLoading("Удаление...");
          api
            .deleteCard(cardData._id)
            .then(() => {
              card.deleteCard();
              delCardConfirmation.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
              delCardConfirmation.setIsLoading("Да");
            });
        });
      },
      handleCardLike: (cardLike) => {
        if (card.isLiked() !== true) {
          api
            .like(cardLike._id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => console.log(err));
        } else {
          api
            .deleteLike(cardLike._id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => console.log(err));
        }
      },
    }
  );
  return card.generateCard();
};

function handleProfileFormOpen() {
  const { name, about } = userInfo.getUserInfo();
  popupInputName.value = name;
  popupInputAbout.value = about;
  popupProfileValidation.resetValidation();
  popupEdit.open();
}

function handleProfileFormSubmit(formData) {
  popupEdit.setIsLoading("Сохранение...");
  api
    .setUserInfo(formData)
    .then((res) => res.json())
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupEdit.setIsLoading("Сохранить"));
}

function handleAddCardFormOpen() {
  popupAddCardValidation.resetValidation();
  popupAdd.open();
}

function handleAddCardFormSubmit(cardData) {
  popupAdd.setIsLoading("Создание...");
  api
    .addCard(cardData)
    .then((data) => {
      renderCard(data);
      popupAdd.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAdd.setIsLoading("Создать"));
}

function handleOpenImagePopup(name, link) {
  bigCard.open(name, link);
}

function handleSubmitChangeAvatarForm(link) {
  newAvatarPopup.setIsLoading("Сохранение...");
  api
    .changeAvatar(link.link)
    .then((data) => {
      userInfo.setUserInfo(data);
      newAvatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => newAvatarPopup.setIsLoading("Сохранить"));
}

function handleChangeAvatarFormOpen() {
  popupAvatarValidation.resetValidation();
  newAvatarPopup.open();
}

popupAvatarValidation.enableValidation();
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
delCardConfirmation.setEventListeners();
bigCard.setEventListeners();
newAvatarPopup.setEventListeners();
popupOpenButtonAddElement.addEventListener("click", handleAddCardFormOpen);
popupOpenButtonEditElement.addEventListener("click", handleProfileFormOpen);
avatarUpdateButton.addEventListener("click", handleChangeAvatarFormOpen);
