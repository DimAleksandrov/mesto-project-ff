// @todo: Темплейт карточки

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(elem, deleteCard) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = placesItem.querySelector('.card__delete-button');

    placesItem.querySelector('.card__image').src = elem.link;
    placesItem.querySelector('.card__title').textContent = elem.name;

    placesList.append(placesItem);

    deleteButton.addEventListener('click', deleteCard);
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    const listItem = event.target.closest('.places__item');
    listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (elem) {
    addCard(elem, deleteCard);
})
