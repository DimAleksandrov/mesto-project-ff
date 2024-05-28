// @todo: Темплейт карточки

import './pages/index.css';
import { initialCards, createCard, deleteCard, likedCard, viewedImage } from './components/cards';
import {openPopup, closePopup, closeOnBackDropClick} from './components/modal';
export {cardTemplate, popupTypeEdit, popupTypeNewCard, placesList, popupTypeImage, setPopup, closePopupButtons, popup};

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditProfil = document.querySelector('.profile__edit-button');
const profileAddProfil = document.querySelector('.profile__add-button');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const closePopupButtons = document.querySelectorAll('.popup__close');


let popup = '';

function setPopup(popupType) {
  popup = popupType;
}

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
});

profileAddProfil.addEventListener('click', function () {
    popup = popupTypeNewCard;
    openPopup(popup);
});

closePopupButtons.forEach((elem) => {
    elem.addEventListener('click', function() {
        closePopup(popup);
    });    
});

popups.forEach((elem) => {
    elem.popup.addEventListener('click', function(event) {
        closeOnBackDropClick(event);
    });
});