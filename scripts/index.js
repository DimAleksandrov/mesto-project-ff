// @todo: Темплейт карточки

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(elem, deleteCard) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placesItem.querySelector('.card__image');
    const cardSrc = placesItem.querySelector('.card__title');
    const deleteButton = placesItem.querySelector('.card__delete-button');

    cardImage.src = elem.link;
    cardImage.alt = elem.alt;
    cardSrc.textContent = elem.name;

    deleteButton.addEventListener('click', deleteCard);
    return placesItem;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    const listItem = event.target.closest('.places__item');
    listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (elem) {
    const card = createCard(elem, deleteCard);
    placesList.append(card);
})
