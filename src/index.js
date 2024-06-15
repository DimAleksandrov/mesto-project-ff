// @todo: Темплейт карточки

import './pages/index.css';
import {createCard, deleteCard, likedCard} from './components/card';
// import {initialCards} from './components/cards';
import {openPopup, closePopup, closeOnBackDropClick} from './components/modal';
import {enableValidation, clearValidation} from './components/validation'

// const token = '94a91796-fbdf-4e14-9e38-9ff505a2733d';
// const webSite = 'https://nomoreparties.co/v1/wff-cohort-16';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
    headers: {
        authorization: '94a91796-fbdf-4e14-9e38-9ff505a2733d',
        'Content-Type': 'application/json',
    }
}

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
const popupButtons = document.querySelectorAll('.popup__button');
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
const cardImage = document.querySelector('.card__image');



const popups = [
    {
        openButton: profileEditProfil,
        popup: popupTypeEdit,    
    },
    {
        openButton: profilImage,
        popup: popupTypeAvatar,    
    },
    {
        openButton: profileAddPlace,
        popup: popupTypeNewCard,    
    },  
    {
        openButton: cardImage,
        popup: popupTypeImage,    
    },
];

let popup = '';
let newCardStatus = false;
let profilImageLink = '';
let profilId = '';

// const getUserInformation = ((resolve) => {
//     fetch(`${config.baseUrl}/users/me`, {
//             method:'GET',
//             headers: config.headers, 
//         })
//             .then(res => res.json())
//             .then((result) => {
//                 resolve(result)
//         })
//         .catch((err) => {
//             console.log('Ошибка. Запрос не выполнен: ', err);
//         });
// })

const getUserInformation = new Promise((resolve) => {
    fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers, 
        })
            .then(res => res.json())
            .then((result) => {
                resolve(result);
            })
})


// function getUserInformation() {
//     fetch(`${webSite}/users/me`, {
//         method:'GET',
//         headers: {
//          authorization: token
//         }
//       })
//         .then(res => res.json())
//         .then((result) => {
//             profileTitle.textContent = result.name;
//             profileDescription.textContent = result.about;
//             profilImage.style.backgroundImage = `url(${result.avatar})`;
//         })
//         .catch((err) => {
//             console.log('Ошибка. Запрос не выполнен: ', err);
//         });
// }

// const getCards = ((resolve) => {
//     fetch(`${config.baseUrl}/cards`, {
//         method:'GET',
//         headers: config.headers,
//       })
//         .then(res => res.json())
//         .then((result) => {
//             resolve(result);
//         })
//         .catch((err) => {
//             console.log('Ошибка. Запрос не выполнен: ', err);
//         });
// })

const getCards = new Promise((resolve) => {
    fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
      })
        .then(res => res.json())
        .then((result) => {
            resolve(result);
        })
})

function createNewCard(saveButton) {
    fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: placeNameInput.value,
            link: linkInput.value,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then ((result) => {
        console.log('resultCreateNewCard = ', result);
        const theFistCard = placesList.firstChild;
        placesList.insertBefore(createCard(result, deleteCard, likedCard, viewedImage, profileTitle, config), theFistCard);
    })
    .finally (()=>{
        closePopup(popupTypeNewCard);
        saveButton.textContent = 'Сохранить';
    })
    
} 



// function getCards() {
//     fetch(`${webSite}/cards`, {
//         method:'GET',
//         headers: {
//          authorization: token
//         }
//       })
//         .then(res => res.json())
//         .then((result) => {
//             console.log(result);
//             const initialCards = Array.from(JSON.parse(JSON.stringify(result)));
//             createCards(initialCards);
//         })
//         .catch((err) => {
//             console.log('Ошибка. Запрос не выполнен: ', err);
//         });
// }
//const promises = [getUserInformation, getCards]
function loadData () {
    Promise.all([getUserInformation, getCards
        // fetch(`${config.baseUrl}/users/me`, {
        //     method:'GET',
        //     headers: config.headers, 
        // })
        // .then(res => res.json()),
            
        // fetch(`${config.baseUrl}/cards`, {
        //     method:'GET',
        //     headers: config.headers,
        //     })
        // .then(res => res.json()),
    ])
    .then(([dataUserInformation, dataCards]) => {
        console.log('dataUserInformation=', dataUserInformation);

        profileTitle.textContent = dataUserInformation.name;
        profileDescription.textContent = dataUserInformation.about;
        profilImage.style.backgroundImage = `url(${dataUserInformation.avatar})`;
        profilId = dataUserInformation._id;
        

        console.log('dataCards=', dataCards);
        createCards(dataCards);
    });
} 

loadData();

function editProfil(saveButton) {
    fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileTitle.textContent,
            about: profileDescription.textContent
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .finally (()=>{
        closePopup(popupTypeEdit);
        saveButton.textContent = 'Сохранить';
    })
};  

//PATCH https://nomoreparties.co/v1/cohortId/users/me/avatar
function editAvatar(saveButton) {
    fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: profilImageLink
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then ((result) => {
        console.log('profilImage.style.backgroundImage = ', result.avatar);
        profilImage.style.backgroundImage = `url(${result.avatar})`;
    })
    .finally (()=>{
        closePopup(popupTypeAvatar);
        saveButton.textContent = 'Сохранить';
    })
};


function createCards(cardsArr) {
    cardsArr.forEach(function (elem) {
        // if (elem.owner.name === profileTitle.textContent) {
        //     newCardStatus = true;
        // } else {
        //     newCardStatus = false;
        // } 
        const card = createCard(elem, deleteCard, likedCard, viewedImage, profilId, config);
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
    //closePopup(popupTypeEdit);
    editProfil(popupButton);
};

function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
    const popupButton = popupTypeAvatar.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    profilImageLink = avatarUrlInput.value;
    editAvatar(popupButton);
};

function handleFormSubmitPlace(evt) {
    evt.preventDefault();
    // const newCard = {};
    // //const theFistCard = placesList.firstChild;
    // newCard.name = placeNameInput.value;
    // newCard.alt = newCard;
    // newCard.link = linkInput.value;
    const popupButton = popupTypeNewCard.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...';
    newCardStatus = true;
    //closePopup(popupTypeNewCard);
    createNewCard(popupButton);
    // placesList.insertBefore(createCard(newCard, deleteCard, likedCard, viewedImage, newCardStatus, config), theFistCard);
    evt.target.reset();
};

function viewedImage(cardImage, cardTitle) {
    popup = popupTypeImage;
    openPopup(popupTypeImage);
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;
};

// getUserInformation();
// getCards();

popups.forEach((elem) => {
  elem.popup.classList.add('popup_is-animated');
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
    elem.popup.addEventListener('click', function(event) {
        if (closeOnBackDropClick(event)) {
            closePopup(elem.popup);
        }
    });
});

enableValidation(validationConfig);

formElement.addEventListener('submit', handleFormSubmitProfil);

formElementAvatar.addEventListener('submit', handleFormSubmitAvatar)

formElementNewPlace.addEventListener('submit', handleFormSubmitPlace);
