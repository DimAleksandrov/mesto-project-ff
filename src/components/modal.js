export { openPopup, closePopup, closeOnBackDropClick, largeImageData };
import { createCard, deleteCard, likedCard, viewedImage } from './cards';  
import { popupTypeEdit, popupTypeNewCard, popupTypeImage, placesList, setPopup, popup} from '../index';
  
const popupButton = document.querySelector('.popup__button');

const formElement = document.forms.edit_profile;
const formElementNewPlace = document.forms.new_place;

const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const placeNameInput = formElementNewPlace.elements.place_name;
const linkInput = formElementNewPlace.elements.link;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Функция открытия popup для редактирования
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  popupElement.removeEventListener('click', openPopup);
}

// Функция закрытия popup
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  defaultData();
}

//Функция закрытия popup при клике на overlay
function closeOnBackDropClick({currentTarget, target }) {
  const dialog = currentTarget;
  let isClickedOnBackDrop = false;

  if (dialog === target) {
      
      isClickedOnBackDrop = true;
  } else {
      isClickedOnBackDrop = false;
  };
  if (isClickedOnBackDrop) {
      closePopup(popup);
  }   
}

function defaultData() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  placeNameInput.value = '';
  linkInput.value = '';
};

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupButton.addEventListener('click', closePopup(popupTypeEdit));
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};
  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const newCard = {};
  const theFistCard = placesList.firstChild;
  newCard.name = placeNameInput.value;
  newCard.link = linkInput.value;    
  placesList.insertBefore(createCard(newCard,deleteCard, likedCard, viewedImage), theFistCard);
  popupButton.addEventListener('click', closePopup(popupTypeNewCard));
  placeNameInput.value = '';
  linkInput.value = '';
};

formElementNewPlace.addEventListener('submit', handleFormSubmitPlace);  

function largeImageData(cardImage, cardTitle) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  openPopup(popupTypeImage);
  
  popupImage.src = cardImage.src;
  popupCaption.textContent = cardTitle.textContent;
  setPopup(popupTypeImage);
};