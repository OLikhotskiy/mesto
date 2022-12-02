const popupElement = document.querySelectorAll('.popup');
const popupElementEdit = document.querySelector('.popup__type_edit');
const popupElementAdd = document.querySelector('.popup__type_add');
const popupCloseButtonElement = document.querySelectorAll('.popup__close');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');
const popupInputPicture = document.querySelector('.popup__input_type_picture');
const popupInputTitle = document.querySelector('.popup__input_type_title');
const popupForm = document.querySelector('.popup__form');

const profileElement = document.querySelector('.profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const elementPicture = document.querySelector('.element__picture');
const elementTitle = document.querySelector('.element__title');

const popupOpenButtonEditElement = document.querySelector('.profile__edit');
const popupOpenButtonAddElement = document.querySelector('.profile__add');
const elementLike = document.querySelectorAll('.element__like');

const openPopupEdit = function() {
    popupElementEdit.classList.add('popup_is-open');
    popupInputName.value = profileName.textContent;
    popupInputAbout.value = profileAbout.textContent;
};

const openPopupAdd = function() {
    popupElementAdd.classList.add('popup_is-open');
};

const closePopup = function() {
    popupElementAdd.classList.remove('popup_is-open');
    popupElementEdit.classList.remove('popup_is-open');
};

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    closePopup();
}

popupOpenButtonEditElement.addEventListener('click', openPopupEdit);
popupOpenButtonAddElement.addEventListener('click', openPopupAdd);
popupCloseButtonElement.forEach(button => button.addEventListener('click', closePopup));
popupForm.addEventListener('submit', formSubmitHandler);

for (let i = 0; i < elementLike.length; i++) {elementLike[i].addEventListener('click', function() {
  elementLike[i].classList.toggle ('element__like_active');
  }
      );
};

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
  