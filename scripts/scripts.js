let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="status"]');

 function openPopup () {
    popup.classList.add('popup_opened');
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    let profileName = document.querySelector('.profile__name');
    let profileStatus = document.querySelector('.profile__status');
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', function () {
    nameInput.value = document.querySelector(".profile__name").textContent;
    jobInput.value = document.querySelector(".profile__status").textContent;
    openPopup();
});
closeButton.addEventListener('click', closePopup);
