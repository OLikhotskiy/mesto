const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupInputName = popupElement.querySelector('.popup__input_name');
const popupInputAbout = popupElement.querySelector('.popup__input_about');
const popupForm = popupElement.querySelector('.popup__form');

const profileElement = document.querySelector('.profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const elementLike = document.querySelectorAll('.element__like');
console.log (elementLike)

const OpenPopup = function() {
    popupElement.classList.add('popup_is-open');
    popupInputName.value = profileName.textContent;
    popupInputAbout.value = profileAbout.textContent;
};

const ClosePopup = function() {
    popupElement.classList.remove('popup_is-open');
};

popupOpenButtonElement.addEventListener('click', OpenPopup);
popupCloseButtonElement.addEventListener('click', ClosePopup);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    ClosePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);

for (let i = 0; i <= 5; i = i + 1) {elementLike[i].addEventListener('click', function() {
    elementLike[i].classList.toggle ('element__like_active');
    }
        );
};