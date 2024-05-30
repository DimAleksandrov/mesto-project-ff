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
const popupButton = document.querySelector('.popup__button');
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