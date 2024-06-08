// @todo: Темплейт карточки

import './pages/index.css';
import {createCard, deleteCard, likedCard} from './components/card';
import {initialCards} from './components/cards';
import {openPopup, closePopup, closeOnBackDropClick} from './components/modal';

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');
const profileEditProfil = document.querySelector('.profile__edit-button');
const profileAddProfil = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const closePopupButtons = document.querySelectorAll('.popup__close');
// const popupButton = document.querySelector('.popup__button');
const formElement = document.forms.edit_profile;
const formElementNewPlace = document.forms.new_place;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const placeNameInput = formElementNewPlace.elements.place_name;
const linkInput = formElementNewPlace.elements.link;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');




// -----------------------------------------------------------------------------
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
       return !inputElement.validity.valid;
    });
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disablesd = true;
      buttonElement.classList.add('button_inactive');
    } else {
      buttonElement.classList.remove('button_inactive');
    }
  }; 
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
//   const enableValidation = () => {
//     const formList = Array.from(document.querySelectorAll('.popup__form'));
//     formList.forEach((formElement) => {
//       formElement.addEventListener('submit', function (evt) {
//         evt.preventDefault();
//         setEventListeners(formElement);
//       });

      
  
//     //   const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
      
//     //   fieldsetList.forEach((fieldSet) => {
//     //     setEventListeners(fieldSet);
//     //   });
//     });
//   };
  
// enableValidation();
// -----------------------------------------------------------------------------



// enableValidation();




let popup = '';

function viewedImage(cardImage, cardTitle) {
    popup = popupTypeImage;
    openPopup(popupTypeImage);
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (elem) {
    const card = createCard(elem, deleteCard, likedCard, viewedImage);
    placesList.append(card);
});

const cardImage = document.querySelector('.card__image');

const popups = [
    {
        openButton: profileEditProfil,
        popup: popupTypeEdit,    
    },
    {
        openButton: profileAddProfil,
        popup: popupTypeNewCard,    
    },  
    {
        openButton: cardImage,
        popup: popupTypeImage,    
    },
];

popups.forEach((elem) => {
  elem.popup.classList.add('popup_is-animated');
});

profileEditProfil.addEventListener('click', function () {
    popup = popupTypeEdit;
    openPopup(popup);
    setInitialValues();
});

profileAddProfil.addEventListener('click', function () {
    popup = popupTypeNewCard;
    openPopup(popup);
    setInitialValues();
});

closePopupButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () =>{
        closePopup(popup);
    });    
});

popups.forEach((elem) => {
    elem.popup.addEventListener('click', function(event) {
        if (closeOnBackDropClick(event)) {
            closePopup(elem.popup);
        }
    });
});

function setInitialValues() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    placeNameInput.value = '';
    linkInput.value = '';
  };
  
  
function handleFormSubmitProfil(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupTypeEdit);
};

setEventListeners(popupTypeEdit);
formElement.addEventListener('submit', handleFormSubmitProfil);

function handleFormSubmitPlace(evt) {
    evt.preventDefault();
    const newCard = {};
    const theFistCard = placesList.firstChild;
    newCard.name = placeNameInput.value;
    newCard.alt = newCard;
    newCard.link = linkInput.value;    
    placesList.insertBefore(createCard(newCard, deleteCard, likedCard, viewedImage), theFistCard);
    closePopup(popupTypeNewCard);
    evt.target.reset();
};

formElementNewPlace.addEventListener('submit', handleFormSubmitPlace);  