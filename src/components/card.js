import {deleteCardOnServer, addLikeOnServer, deleteLikeOnServer} from './api';
import {openPopup, closePopup} from './modal';

const cardTemplate = document.querySelector('#card-template').content;
const popupTypeDeleteCard = document.querySelector('.popup_type_delete-card');

function createCard(card, deleteCard, likedCard, viewedImage, profilId, config) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesItem.querySelector('.card__image');
  const cardTitle = placesItem.querySelector('.card__title');
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const likedButton = placesItem.querySelector('.card__like-button');
  const likeQuntity = placesItem.querySelector('.card__like-quantity');
  
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeQuntity.textContent = card.likes.length;

  if (card.owner._id === profilId) {
    deleteButton.classList.remove('delete-button-hidden');
  } else {
    deleteButton.classList.add('delete-button-hidden');
  } 

  card.likes.forEach((like) => {
    if (profilId === like._id) {
      likedButton.classList.add('card__like-button_is-active');
    }
  });

  deleteButton.addEventListener('click', function() {
    deleteCard(placesItem, card, config);
  });

  likedButton.addEventListener('click', function() {
    likedCard(likedButton, likeQuntity, card, config);
  });

  cardImage.addEventListener('click', function() {
    viewedImage(cardImage, cardTitle);
  });
  return placesItem;
};

function handleFormSubmitDeleteCard(placesItem, card, config) {
  deleteCardOnServer(card._id, config).then(() => {
    placesItem.remove();
  })
  .then (()=>{
    closePopup(popupTypeDeleteCard);
  })
  .catch ((err) => {
    console.log(err);
  });
}

// @todo: Функция удаления карточки
function deleteCard(placesItem, card, config) {
  openPopup(popupTypeDeleteCard);
  const submitButton = popupTypeDeleteCard.querySelector('.popup__button')
  submitButton.addEventListener('click', () => {
    handleFormSubmitDeleteCard(placesItem, card, config)
  });
};

function likedCard(likedButton, likeQuntity, card, config) {
  if (likedButton.classList.contains('card__like-button_is-active')) {
    deleteLikeOnServer(card._id, likeQuntity, config)
    .then((result) => {
      likedButton.classList.remove('card__like-button_is-active');
      likeQuntity.textContent = result.likes.length;
  })
    .catch ((err) => {
      console.log(err);
    })
  } else {
    addLikeOnServer(card.likes, likeQuntity, card._id, config)
    .then((result) => {
      likedButton.classList.add('card__like-button_is-active');
      likeQuntity.textContent = result.likes.length;
    })
    .catch ((err) => {
      console.log(err);
    })
  }
};

export {createCard, deleteCard, likedCard};