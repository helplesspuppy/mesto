let popup = document.querySelector('.popup');
let popup_edit = document.querySelector('.popup_edit');
let popup_add = document.querySelector('.popup_add');
// Кнопки
let editButton = document.querySelector('.profile__edit-button');
let closeButtonEdit = document.querySelector('.popup__close-button_edit');
let closeButtonAdd = document.querySelector('.popup__close-button_add');
let addButton = document.querySelector('.profile__add-button');
//Формы редактирования и добавления
let formElementEdit = document.querySelector('.popup__form_edit');
let formElementAdd = document.querySelector('.popup__form_add');
// Инпуты попапа редактирования
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="status"]');
// Инпуты попапа добавления фотографий
let picInput = document.querySelector('input[name="pictureName"]');
let picLink = document.querySelector('input[name="picLink"]');
// Данные профиля
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

 function openPopup (popup) {
    popup.classList.add('popup_opened');
}

function closePopup (popup) {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    closePopup ();
}


formElementEdit.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', formSubmitHandler);
// Анонимная функция, в которую вкладываем колбэк с нужным попап-параметром
editButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
    openPopup(popup_edit)});

closeButtonEdit.addEventListener('click', () => closePopup(popup_edit));
closeButtonAdd.addEventListener('click', () => closePopup(popup_add));
addButton.addEventListener('click', () => {openPopup(popup_add)});