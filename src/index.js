import './pages/index.css';
import {createCard, deleteCard, likedCard} from './components/card';
import {openPopup, closePopup, closeOnBackDropClick} from './components/modal';
import {enableValidation, clearValidation} from './components/validation';
import {config, loadData, createNewCard, editProfil, editAvatar, checkImagelink} from './components/api';

// const token = '94a91796-fbdf-4e14-9e38-9ff505a2733d';
// const webSite = 'https://nomoreparties.co/v1/wff-cohort-16';


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const placesList = document.querySelector('.places__list');
const profileEditProfil = document.querySelector('.profile__edit-button');
const profileAddPlace = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const closePopupButtons = document.querySelectorAll('.popup__close');
const formElement = document.forms.edit_profile;
const formElementAvatar = document.forms.new_avatar;
const formElementNewPlace = document.forms.new_place;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const avatarUrlInput = formElementAvatar.elements.avatar_link
const placeNameInput = formElementNewPlace.elements.place_name;
const linkInput = formElementNewPlace.elements.link;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profilImage = document.querySelector('.profile__image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popups = Array.from(document.querySelectorAll('.popup'));

let popup = '';
let profilImageLink = '';
let profileId = ''; 

loadData().then(([dataUserInformation, dataCards]) => {
    profileTitle.textContent = dataUserInformation.name;
    profileDescription.textContent = dataUserInformation.about;
    profilImage.style.backgroundImage = `url(${dataUserInformation.avatar})`;
    profileId = dataUserInformation._id;
    createCards(dataCards);
});


function createCards(cardsArr) {
    cardsArr.forEach(function (elemCardsArr) {
        const card = createCard(elemCardsArr, deleteCard, likedCard, viewedImage, profileId, config);
        placesList.append(card);
    });
}

function setInitialValues() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    avatarUrlInput.value = '';
    placeNameInput.value = '';
    linkInput.value = '';
};

function handleFormSubmitProfil(evt) {
    evt.preventDefault();
    const popupButton = popupTypeEdit.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    editProfil(profileTitle, profileDescription)
    .finally (()=>{
        closePopup(popupTypeEdit);
        popupButton.textContent = 'Сохранить';
    });
};

function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
    const popupButton = popupTypeAvatar.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    profilImageLink = avatarUrlInput.value;
    // checkImagelink(profilImageLink)
    // .then((result) => {
    //     console.log(result.ok);
    // });
    editAvatar(profilImageLink).then((dataProfilImageLink) => {
        profilImage.style.backgroundImage = `url(${dataProfilImageLink.avatar})`;
    })
    .finally (()=>{
        closePopup(popupTypeAvatar);
        popupButton.textContent = 'Сохранить';
    });
};

function handleFormSubmitPlace(evt) {
    evt.preventDefault();
    const popupButton = popupTypeNewCard.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    createNewCard(placeNameInput, linkInput)
    .then ((dataNewCard) => {
        const theFistCard = placesList.firstChild;
        placesList.insertBefore(createCard(dataNewCard, deleteCard, likedCard, viewedImage, profileId, config), theFistCard);
    })
    .finally (()=>{
        closePopup(popupTypeNewCard);
        popupButton.textContent = 'Сохранить';
    });
    evt.target.reset();
};

function viewedImage(cardImage, cardTitle) {
    popup = popupTypeImage;
    openPopup(popupTypeImage);
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;
};

popups.forEach((elem) => {
  elem.classList.add('popup_is-animated');
});

profileEditProfil.addEventListener('click', function () {
    popup = popupTypeEdit;
    openPopup(popup);
    setInitialValues();
    clearValidation(popup, validationConfig);
});

profilImage.addEventListener('click', function () {
    popup = popupTypeAvatar;
    openPopup(popup);
    setInitialValues();
    clearValidation(popup, validationConfig);
});

profileAddPlace.addEventListener('click', function () {
    popup = popupTypeNewCard;
    openPopup(popup);
    setInitialValues();
    clearValidation(popup, validationConfig);
});

closePopupButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () =>{
        closePopup(popup);
    });    
});

popups.forEach((elem) => {
    elem.addEventListener('click', function(event) {
        if (closeOnBackDropClick(event)) {
            closePopup(elem);
        }
    });
});

enableValidation(validationConfig);

formElement.addEventListener('submit', handleFormSubmitProfil);

formElementAvatar.addEventListener('submit', handleFormSubmitAvatar)

formElementNewPlace.addEventListener('submit', handleFormSubmitPlace);
