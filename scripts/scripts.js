let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="status"]');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

 function openPopup () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
    popup.classList.add('popup_opened');
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
