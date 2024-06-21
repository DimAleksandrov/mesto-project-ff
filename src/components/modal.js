function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened'); //<==нашли открытый попап
    closePopup(openedPopup);// <== закрыли попап с помощью функции `closePopup` ==
  }
}

// Функция открытия popup для редактирования
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape); 
}

// Функция закрытия popup
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

export { openPopup, closePopup};