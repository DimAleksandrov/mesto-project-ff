export {createCard, deleteCard, likedCard};

const cardTemplate = document.querySelector('#card-template').content;

function createCard(elem, deleteCard, likedCard, viewedImage) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesItem.querySelector('.card__image');
  const cardSrc = placesItem.querySelector('.card__title');
  const cardTitle = placesItem.querySelector('.card__title');
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const likedButton = placesItem.querySelector('.card__like-button');
  
  cardImage.src = elem.link;
  cardImage.alt = elem.alt;
  cardSrc.textContent = elem.name;

  deleteButton.addEventListener('click', function() {
    deleteCard(placesItem);
  });

  likedButton.addEventListener('click', function() {
    likedCard(likedButton);
  });

  cardImage.addEventListener('click', function() {
    viewedImage(cardImage, cardTitle);
  });

  return placesItem;
};

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
};

function likedCard(likedButton) {
  likedButton.classList.toggle('card__like-button_is-active');
};