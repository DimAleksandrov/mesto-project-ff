export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const placesList = document.querySelector('.places__list');
export const profileEditProfil = document.querySelector('.profile__edit-button');
export const profileAddPlace = document.querySelector('.profile__add-button');
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeAvatar = document.querySelector('.popup_type_avatar');
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const closePopupButtons = document.querySelectorAll('.popup__close');
export const profileForm = document.forms.edit_profile;
export const avatarForm = document.forms.new_avatar;
export const newPlaceForm = document.forms.new_place;
export const nameInput = profileForm.elements.name;
export const jobInput = profileForm.elements.description;
export const avatarUrlInput = avatarForm.elements.avatar_link
export const placeNameInput = newPlaceForm.elements.place_name;
export const linkInput = newPlaceForm.elements.link;
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profilImage = document.querySelector('.profile__image');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');
export const popups = Array.from(document.querySelectorAll('.popup'));