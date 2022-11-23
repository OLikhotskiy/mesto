const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupInputName = popupElement.querySelector('.popup__input_type_name');
const popupInputAbout = popupElement.querySelector('.popup__input_type_about');
const popupForm = popupElement.querySelector('.popup__form');

const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileAbout = profileElement.querySelector('.profile__about');
const popupOpenButtonElement = profileElement.querySelector('.profile__edit');

const openPopup = function() {
    popupElement.classList.add('popup_is-open');
    popupInputName.value = profileName.textContent;
    popupInputAbout.value = profileAbout.textContent;
};

const closePopup = function() {
    popupElement.classList.remove('popup_is-open');
};

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    ClosePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);