let popup = document.querySelector('.popup');
let popup_edit = document.querySelector('.popup_edit');
let popup_add = document.querySelector('.popup_add');
// Кнопки
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let addButton = document.querySelector('.profile__add-button');
//Формы редактирования и добавления
let formElementEdit = document.querySelector('.popup__form_edit');
let formElementAdd = document.querySelector('.popup__form_add');
// Инпуты попапа редактирования
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="status"]');
// Инпуты попапа фотографий
let picInput = document.querySelector('input[name="pictureName"]');
let picLink = document.querySelector('input[name="picLink"]');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

 function openPopup () {
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


formElementEdit.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', (evt) => {evt.preventDefault();closePopup();})

editButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
    openPopup()});
closeButton.addEventListener('click', closePopup);
addButton.addEventListener('click', openPopup);
