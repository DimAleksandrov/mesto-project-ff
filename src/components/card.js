export {createCard, deleteCard, likedCard};

const cardTemplate = document.querySelector('#card-template').content;

function createCard(elem, deleteCard, likedCard, viewedImage, profilId, config) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesItem.querySelector('.card__image');
  const cardTitle = placesItem.querySelector('.card__title');
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const likedButton = placesItem.querySelector('.card__like-button');
  const likeQuntity = placesItem.querySelector('.card__like-quantity');
  
  cardImage.src = elem.link;
  cardImage.alt = elem.name;
  cardTitle.textContent = elem.name;
  likeQuntity.textContent = elem.likes.length;

  if (elem.owner._id === profilId) {
    deleteButton.classList.remove('delete-button-hidden');
  } else {
    deleteButton.classList.add('delete-button-hidden');
  } 

  elem.likes.forEach((like) => {
    if (profilId === like._id) {
      likedButton.classList.add('card__like-button_is-active');
    }
  });

  // if (newCardStatus) {
  //   deleteButton.classList.remove('delete-button-hidden');
  // } else {
  //   deleteButton.classList.add('delete-button-hidden');
  // }

  deleteButton.addEventListener('click', function() {
    deleteCard(placesItem, elem, config);
  });

  likedButton.addEventListener('click', function() {
    likedCard(likedButton, likeQuntity, elem, config);
  });

  cardImage.addEventListener('click', function() {
    viewedImage(cardImage, cardTitle);
  });
  return placesItem;
};

function deleteCardOnServer(cardId, config) {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

//PUT https://nomoreparties.co/v1/cohortId/cards/likes/cardId
function addLikeOnServer(likeArr, likeQunt, cardId, config) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify(likeArr)
  })
  .then(res => res.json())
  .then((result) => {
    console.log('like=', result);
    likeQunt.textContent = result.likes.length;
})
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}

//DELETE https://nomoreparties.co/v1/cohortId/cards/likes/cardId
function deleteLikeOnServer(cardId, likeQunt, config) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => res.json())
  .then((result) => {
    console.log('dislike=', result);
    likeQunt.textContent = result.likes.length;
})
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

}

// @todo: Функция удаления карточки
function deleteCard(card, elem, config) {
  card.remove();
  deleteCardOnServer(elem._id, config);
};

function likedCard(likedButton, likeQuntity, elem, config) {

  likedButton.classList.toggle('card__like-button_is-active');
  if (likedButton.classList.contains('card__like-button_is-active')) {
    console.log('+1');
    // console.log(likeQuntity.textContent);
    // likeQunt = Number(likeQuntity.textContent) + 1 ;
    // likeQuntity.textContent = likeQunt;
    addLikeOnServer(elem.likes, likeQuntity, elem._id, config);
    
  } else {
    console.log('-1');
    // likeQunt = Number(likeQuntity.textContent) - 1 ;
    // likeQuntity.textContent = likeQunt;

    deleteLikeOnServer(elem._id, likeQuntity, config);
  }
};