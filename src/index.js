import './pages/index.css';
import {createCard, deleteCard, likedCard} from './components/card';
import {openPopup, closePopup, closeOnBackDropClick} from './components/modal';
import {enableValidation, clearValidation} from './components/validation';
import {config, loadData, createNewCard, editProfil, editAvatar} from './components/api';
import {handleSubmit} from './components/utils'
import {
    validationConfig,
    placesList,
    profileEditProfil,
    profileAddPlace,
    popupTypeEdit,
    popupTypeAvatar,
    popupTypeNewCard,
    popupTypeImage,
    profileForm,
    avatarForm,
    newPlaceForm,
    nameInput,
    jobInput,
    avatarUrlInput,
    placeNameInput,
    linkInput,
    profileTitle,
    profileDescription,
    profilImage,
    popupImage,
    popupCaption,
    popups,
} from './components/utils/constants'

// const token = '94a91796-fbdf-4e14-9e38-9ff505a2733d';
// const webSite = 'https://nomoreparties.co/v1/wff-cohort-16';

const cardMethods = {
    deleteCard, 
    likedCard, 
    viewedImage
}

let profilImageLink = '';
let profileId = ''; 

loadData().then(([dataUserInformation, dataCards]) => {
    profileTitle.textContent = dataUserInformation.name;
    profileDescription.textContent = dataUserInformation.about;
    profilImage.style.backgroundImage = `url(${dataUserInformation.avatar})`;
    profileId = dataUserInformation._id;
    createCards(dataCards);
})
.catch (handleError);

function handleError(err) { 
    // обрабатываем ошибку 
    console.log('Ошибка. Запрос не выполнен: ', err); 
}  

function createCards(cardsElements, method = "append") {
    cardsElements.forEach(function (card) {
        const cardElement = createCard(card, profileId, cardMethods, config);
        placesList[ method ](cardElement)
    });
}

function fillProfileInputs() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};

function clearAvatarFormInputs() {
    avatarForm.reset();
};

function clearNewCardFormInputs() {
    newPlaceForm.reset();
};

function handleFormSubmitProfil(evt) {
    function makeRequest() {
        return editProfil(nameInput.value, jobInput.value)
        .then (() => {
            profileTitle.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;
        })
        .then (()=>{
            closePopup(popupTypeEdit);
        })
    }
    handleSubmit(makeRequest, evt);
};

function handleFormSubmitAvatar(evt) {
    profilImageLink = avatarUrlInput.value;
    function makeRequest() {
        return editAvatar(profilImageLink)
        .then((dataProfilImageLink) => {
            profilImage.style.backgroundImage = `url(${dataProfilImageLink.avatar})`;
            closePopup(popupTypeAvatar);
        })
    }
    handleSubmit(makeRequest, evt);
};

function handleFormSubmitPlace(evt) {
    function makeRequest() {
        return createNewCard(placeNameInput, linkInput)
        .then ((dataNewCard) => {
            const theFistCard = placesList.firstChild;
            placesList.insertBefore(createCard(dataNewCard, profileId, cardMethods, config), theFistCard);
            closePopup(popupTypeNewCard);
        })
    }
    handleSubmit(makeRequest, evt);
};

function viewedImage(cardImage, cardTitle) {
    openPopup(popupTypeImage);
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;
};

popups.forEach((elem) => {
  elem.classList.add('popup_is-animated');
});

profileEditProfil.addEventListener('click', function () {
    openPopup(popupTypeEdit);
    fillProfileInputs();
    clearValidation(popupTypeEdit, validationConfig);
});

profilImage.addEventListener('click', function () {
    openPopup(popupTypeAvatar);
    clearAvatarFormInputs();
    clearValidation(popupTypeAvatar, validationConfig);
});

profileAddPlace.addEventListener('click', function () {
    openPopup(popupTypeNewCard);
    clearNewCardFormInputs();
    clearValidation(popupTypeNewCard, validationConfig);
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
        if (evt.currentTarget === evt.target) {
          closePopup(popup);
        }
    })
})

enableValidation(validationConfig);

profileForm.addEventListener('submit', handleFormSubmitProfil);

avatarForm.addEventListener('submit', handleFormSubmitAvatar)

newPlaceForm.addEventListener('submit', handleFormSubmitPlace);