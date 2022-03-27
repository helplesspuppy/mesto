let popup = document.querySelector('.popup');
let popup_edit = document.querySelector('.popup_edit');
let popup_add = document.querySelector('.popup_add');
let popupImage = document.querySelector('.popup__image');

let editButton = document.querySelector('.profile__edit-button');
let closeButtonEdit = document.querySelector('.popup__close-button_edit');
let closeButtonAdd = document.querySelector('.popup__close-button_add');
let closeButtonImage = document.querySelector('.popup__close-button_image');
let addButton = document.querySelector('.profile__add-button');


let formElementEdit = document.querySelector('.popup__form_edit');
let formElementAdd = document.querySelector('.popup__form_add');


let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="status"]');

let picInput = document.querySelector('input[name="pictureName"]');
let picLink = document.querySelector('input[name="picLink"]');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

const cardTemplate = document.querySelector('.template-card').content;
const elementsList = document.querySelector('.elements__list');

const mestoImage = document.querySelector('.popup__mesto-image');
const mestoText = document.querySelector('.popup__mesto-text');

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

function render() {
  const cadsArray = initialCards.map((card) => { return getItem(card); });
  elementsList.append(...cadsArray);
}

function getItem(card) {
  const newCard = cardTemplate.cloneNode(true);
  const titleEl = newCard.querySelector('.element__title');
  const photoEl = newCard.querySelector('.element__photo');
  titleEl.textContent = card.name;
  photoEl.src = card.link;
  const likeBtn = newCard.querySelector('.element__like-button');
  likeBtn.addEventListener('click', like);
  const deleteBtn = newCard.querySelector('.element__delete-button');
  deleteBtn.addEventListener('click', cardDelete);
  photoEl.addEventListener('click', () => { openPopup(popupImage); mestoImage.src = card.link; mestoText.textContent = card.name});
  return newCard;
}

function like(evt) {
  const targetEl = evt.target;
  targetEl.classList.toggle('element__like-button_active');
}

function addCard() {
  const placeText = picInput.value;
  const placeLink = picLink.value;
  const cardItem = getItem({ name: placeText, link: placeLink });
  elementsList.prepend(cardItem);
}

function cardDelete(evt) {
  const targetEl = evt.target;
  const cardItem = targetEl.closest('.element');
  cardItem.remove();
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popup_edit);
}



formElementEdit.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', (evt) => { evt.preventDefault(); closePopup(popup_add); addCard(); picInput.value = ''; picLink.value = ''; });

editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  openPopup(popup_edit)
});

closeButtonEdit.addEventListener('click', () => closePopup(popup_edit));
closeButtonAdd.addEventListener('click', () => { closePopup(popup_add); picInput.value = ''; picLink.value = ''; });
closeButtonImage.addEventListener('click', () => closePopup(popupImage));
addButton.addEventListener('click', () => { openPopup(popup_add) });
render();
