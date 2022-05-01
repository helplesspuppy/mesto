const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');

const openPopupProfileButton = document.querySelector('.profile__edit-button');
const closePopupProfileButton = document.querySelector('.popup__close_edit');

const addNewCardButton = document.querySelector('.profile__add-button');
const closePopupAddButton = document.querySelector('.popup__close_add');

const formEditProfile = document.querySelector('.popup__form_edit');
const formAdd = document.querySelector('.popup__form_add');

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
const inputError = Array.from(document.querySelectorAll('.popup__input-error'));
const inputs = Array.from(document.querySelectorAll('.popup__data-box'));
const submitEditButton = formEditProfile.querySelector('.popup__submit');
const submitAddButton = formAdd.querySelector('.popup__submit');

const initialCards = [
  {
    name: 'Я',
    link: 'https://sun9-55.userapi.com/s/v1/if2/drgK043DHKrGankyaqcCvxk7_Ye4QMer55th2hu77NYDF13bOrmEwjXeJIsX0x3yr5IqdwQHeUYdRPFMPBuffQFP.jpg?size=563x518&quality=96&type=album'
  },
  {
    name: 'Устал',
    link: 'https://sun9-27.userapi.com/s/v1/if2/qoggablNyaAHwYfYxU7rJYKiDLj9515WGm0iBvhady9iHZ1gbMlcnyh60vAykk2M1EgrEMN5uWG8QQeTb2Unvuz9.jpg?size=1600x1221&quality=96&type=album'
  },
  {
    name: 'от',
    link: 'https://sun9-70.userapi.com/s/v1/if2/gjI79Ocfx3p6-9fYERps-4s4HWjh0EwjmVyDqHp2pvkE2Iehg6RzykY3MlJrFnwn_d7u62PW7RNL5n8yhzQQ8Er3.jpg?size=705x705&quality=96&type=album'
  },
  {
    name: 'Этой',
    link: 'https://sun9-84.userapi.com/s/v1/if2/sXgFdOGTV3rOEMmdMkcpWAhlKvekyJDYmmz9WnTduKgAQ2xROhxe6wekSAaS7XOyCX3ryJS9WiHc5cHrulo8jt2w.jpg?size=750x750&quality=95&type=album'
  },
  {
    name: 'Дурацкой',
    link: 'https://sun9-54.userapi.com/s/v1/if2/6ysfTLkpiDytewe5rhvu2XKwwy4FRxWguDJ_LGM8xEAgJ65qUb3ZxZW-euimemqinrnAok0H_9B-pAfoUEmnTG43.jpg?size=1080x1080&quality=95&type=album'
  },
  {
    name: 'Валидации',
    link: 'https://sun4-12.userapi.com/s/v1/if2/YqmW8SEA0uW3c3VofmSKOGDzURnA4CQjQw-kqyelANXghVbsi6LHHVKawWisIEelk__cPJx8ZEqzqk0eMTNOMvLI.jpg?size=1282x978&quality=95&type=album'
  }
];



function render() {
  const cardsList = initialCards.map((card) => {
      return createItem(card);
    });
    listContainer.append(...cardsList);
}

function createItem(card) {
  const newCard = templateBox.content.cloneNode(true);
  const cardTitle = newCard.querySelector('.elements__title');
  const imageElement = newCard.querySelector('.elements__image');
  cardTitle.textContent = card.name;
  imageElement.src = card.link;
  const deleteButton = newCard.querySelector('.elements__delete-button');
  deleteButton.addEventListener('click', handleDelete);
  const likeButton = newCard.querySelector('.elements__like-button');
  likeButton.addEventListener('click', handleLikeClick);
  const imageAdress = imageElement.src;
  imageElement.alt = card.name;
  const imageTitle = cardTitle.textContent;
  imageElement.addEventListener('click', () => {
    popupPlacePicture.src = imageAdress;
    popupPlacePicture.alt = card.name;
    popupPlaceName.textContent = imageTitle;
    showPopup(popupImage)
    });
  return newCard;
}

function closePopupByEsc (evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    hidePopup(popupOpened);
  }
}

function closePopupOnOverlay(evt) {
  if(evt.target.classList.contains('popup__overlay') ) {
    const popupOpened = document.querySelector('.popup_opened')
    hidePopup(popupOpened);
  }
}

function resetPopup(popup) {
  inputError.forEach((error) => {
    error.textContent = '';
  });
  inputs.forEach((errorLine) => {
    errorLine.classList.remove('popup__data-box_error')
  });
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupOnOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupOnOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
}

function handleProfileSubmit (evt) {
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  hidePopup(editPopup);
}

function handleAddCard(evt)  {
  const placeText = placeInput.value;
  const placeLink = linkInput.value;
  const cardItem = createItem({name: placeText, link: placeLink});
  listContainer.prepend(cardItem);
  hidePopup(addPopup);
  formAdd.reset();
  submitAddButton.classList.add('popup__submit_inactive');
  submitAddButton.disabled = true;
}

function handleDelete(evt) {
  const targetEl = evt.target;
  const cardItem = targetEl.closest('.elements__box');
  cardItem.remove();
}

function handleLikeClick(evt) {
  const targetEl = evt.target;
  targetEl.classList.toggle('elements__like-button_active');
}

openPopupProfileButton.addEventListener('click', () => {
  resetPopup(editPopup);
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  submitEditButton.disabled = false;
  submitEditButton.classList.remove('popup__submit_inactive');
  showPopup(editPopup);
  });
closePopupProfileButton.addEventListener('click', () => hidePopup(editPopup) );
formEditProfile.addEventListener('submit', handleProfileSubmit );
addNewCardButton.addEventListener('click', () => {
  resetPopup(addPopup);
  showPopup(addPopup);
});
closePopupAddButton.addEventListener('click', () => hidePopup(addPopup) );
formAdd.addEventListener('submit', handleAddCard);
popupImageCloseButton.addEventListener('click',() => hidePopup(popupImage) );

render()