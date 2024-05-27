export { initialCards, createCard, deleteCard, likedCard, viewedImage };
import { cardTemplate } from '../index';
import { largeImageData } from './modal';

const ArhyzImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url);
const ChelabinskOblastImage  = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", import.meta.url);
const IvanovoImage = new  URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", import.meta.url);
const KamchatkaImage = new  URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", import.meta.url);
const HolmogorImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", import.meta.url);
const BaikalImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url);

const initialCards = [
    {
      name: "Архыз",
      link: ArhyzImage,
      alt: "Горы в солнечную погоду. Видны остатки снега"
    },
    {
      name: "Челябинская область",
      link: ChelabinskOblastImage,
      alt: "Озеро. С одной стороны каменный берег с небольшим количеством снега, с другой в низине - небольшой лес."
    },
    {
      name: "Иваново",
      link: IvanovoImage,
      alt: "Панельные девятиэтажки стаят вплотную друг с другом"
    },
    {
      name: "Камчатка",
      link: KamchatkaImage,
      alt: "Гора посередине с заснеженным хребтом. Вид на гору с подножья горы"
    },
    {
      name: "Холмогорский район",
      link: HolmogorImage,
      alt: "Железная дорога разрезает невысокий лес пополам"
    },
    {
      name: "Байкал",
      link: BaikalImage,
      alt: "Небольшпя часть скалистого зимнего берега озера Байкал "
    }
];


// @todo: Функция создания карточки
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

function viewedImage(cardImage, cardTitle) {
  largeImageData(cardImage, cardTitle);
};