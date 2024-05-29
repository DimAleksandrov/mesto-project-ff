export { openPopup, closePopup, closeOnBackDropClick };
  
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened'); //<==нашли открытый попап
    closePopup(openedPopup);// <== закрыли попап с помощью функции `closePopup` ==
  }
}

// Функция открытия popup для редактирования
function openPopup(popupElement, setInitialValues) {
  setInitialValues();
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape); 
}

// Функция закрытия popup
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

//Функция закрытия popup при клике на overlay
function closeOnBackDropClick({currentTarget, target }) {
  const dialog = currentTarget;
  let isClickedOnBackDrop = false;

  if (dialog === target) {
      
      isClickedOnBackDrop = true;
  } else {
      isClickedOnBackDrop = false;
  };
  return isClickedOnBackDrop;
  };