
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = document.querySelector('.popup__close-button_edit');
const closeButtonAdd = document.querySelector('.popup__close-button_add');
const closeButtonImage = document.querySelector('.popup__close-button_image');
const addButton = document.querySelector('.profile__add-button');


const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');


const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="status"]');

const picInput = document.querySelector('input[name="pictureName"]');
const picLink = document.querySelector('input[name="picLink"]');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

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
  photoEl.alt = card.name;
  const likeBtn = newCard.querySelector('.element__like-button');
  likeBtn.addEventListener('click', like);
  const deleteBtn = newCard.querySelector('.element__delete-button');
  deleteBtn.addEventListener('click', deleteCard);
  photoEl.addEventListener('click', () => { 
    openPopup(popupImage); 
    mestoImage.src = card.link; 
    mestoText.textContent = card.name;
    mestoImage.alt = card.name;
  });
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

function deleteCard(evt) {
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

const handleEscUp = (evt) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.keyCode == '27') {
    closePopup(activePopup);
  }
}

const handleOverLay = (evt) => {
  const activePopup = document.querySelector('.popup_opened'); // Дублирование кода?
  if (evt.target.classList.contains('popup__overlay')) {
    closePopup(activePopup);
  }
}



function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popupEdit);
}



formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', (evt) => { 
  evt.preventDefault(); 
  closePopup(popupAdd); 
  addCard(); 
  picInput.value = ''; 
  picLink.value = ''; 
});

editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  openPopup(popupEdit)
});


document.addEventListener('keyup', handleEscUp);
document.addEventListener('click', handleOverLay);
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonAdd.addEventListener('click', () => { closePopup(popupAdd)});
closeButtonImage.addEventListener('click', () => closePopup(popupImage));
addButton.addEventListener('click', () => { openPopup(popupAdd) });
render();
