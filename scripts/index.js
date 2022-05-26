const editPopup = document.querySelector('.popup_edit')
const addPopup = document.querySelector('.popup_add')
const openPopupProfileButton = document.querySelector('.profile__edit-button');
const closePopupProfileButton = document.querySelector('.popup__close_edit');
const addNewCardButton = document.querySelector('.profile__add-button');
const closePopupAddButton = document.querySelector('.popup__close_add');
const formEditProfile = document.querySelector('.popup__form_edit');
const formAdd = document.querySelector('.popup__form_add')
const nameInput = document.querySelector('[name="user-name"]');
const statusInput = document.querySelector('[name="user-status"]');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const placeInput = document.querySelector('[name="place-name"]');
const linkInput = document.querySelector('[name="place-link"]');
const templateBox = document.querySelector('.template');
const listContainer = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_image');
const popupImageCloseButton = document.querySelector('.popup__close_image')
const popupPlacePicture = document.querySelector('.popup__place-picture');
const popupPlaceName = document.querySelector('.popup__place-name');
const submitEditButton = formEditProfile.querySelector('.popup__submit');

import FormValidator from './FormValidator.js';
import Card from './Card.js'

function render() {
  const cardsList = initialCards
    .map((place) => {
      const cardBox = new Card('.template', place.name, place.link, handleOpenImage);
      return cardBox.getView();
    });
    listContainer.append(...cardsList);
}

const dataOfValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__data-box',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__data-box_error',
  errorClass: 'popup__input-error_visible'
});

const addCardValidation = new FormValidator(dataOfValidation, formAdd);
const editProfileValidation = new FormValidator(dataOfValidation, formEditProfile);
addCardValidation.enableValidtaion();
editProfileValidation.enableValidtaion();

function handleOpenImage(title, image) {
  showPopup(popupImage);
  document.querySelector('.popup__place-picture').src = image;
  document.querySelector('.popup__place-name').textContent = title;

}

function closePopupByEsc (evt) {
  if(evt.key === 'Escape') {
    hidePopup();
  }
}

function closePopupOnOverlay(evt) {
  if(evt.target.classList.contains('popup__overlay') ) {
    hidePopup();
  }
}

function handleAddCard(placeInput, imageInput) {
  const createdCard = new Card('.template', placeInput.value, imageInput.value, handleOpenImage);
  listContainer.prepend(createdCard.getView() );
  hidePopup();
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupOnOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}

function hidePopup() {
  const popup = document.querySelector('.popup_opened')
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupOnOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
}

function handleProfileSubmit (evt) {
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  hidePopup();
}

openPopupProfileButton.addEventListener('click', () => {
  editProfileValidation.clearValidation();
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  submitEditButton.disabled = false;
  submitEditButton.classList.remove('popup__submit_inactive');
  showPopup(editPopup);
  });
closePopupProfileButton.addEventListener('click', () => hidePopup() );
formEditProfile.addEventListener('submit', handleProfileSubmit );
addNewCardButton.addEventListener('click', () => {
  addCardValidation.clearValidation();
  showPopup(addPopup);
});
formAdd.addEventListener('submit', () => {
  handleAddCard(placeInput, linkInput);
})
closePopupAddButton.addEventListener('click', () => hidePopup() );
popupImageCloseButton.addEventListener('click',() => hidePopup() );

render()