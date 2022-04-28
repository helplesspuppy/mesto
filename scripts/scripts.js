
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = document.querySelector('.popup__close-button_edit');
const closeButtonAdd = document.querySelector('.popup__close-button_add');
const closeButtonImage = document.querySelector('.popup__close-button_image');
const addButton = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__submit-button');
const escapeButton = 27;


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
  const cadsArray = initialCards.map((card) => { return createItem(card); });
  elementsList.append(...cadsArray);
}

function createItem(card) {
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
  const cardItem = createItem({ name: placeText, link: placeLink });
  elementsList.prepend(cardItem);
}

function deleteCard(evt) {
  const targetEl = evt.target;
  const cardItem = targetEl.closest('.element');
  cardItem.remove();
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
  popup.addEventListener('click', handleOverLay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscUp);
  popup.removeEventListener('click', handleOverLay); 
}

const handleEscUp = (evt) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.keyCode == escapeButton) {
    closePopup(activePopup);
  }
}

const handleOverLay = (evt) => {
  const activePopup = document.querySelector('.popup_opened'); 
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
// деактив кнопки
function disableButtonSubmit() {
  submitButton.setAttribute('disabled',true);
}



formElementEdit.addEventListener('submit', handleProfileFormSubmit);
 formElementAdd.addEventListener('submit', (evt) => { 
  evt.preventDefault(); 
  closePopup(popupAdd); 
  addCard(); 
  formElementAdd.reset();
  disableButtonSubmit();
});

editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  openPopup(popupEdit)
});


closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
closeButtonImage.addEventListener('click', () => closePopup(popupImage));
addButton.addEventListener('click', () => openPopup(popupAdd));
render();
