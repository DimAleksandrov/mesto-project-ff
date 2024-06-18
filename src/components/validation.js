// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   }) 

function showInputError(formElement, inputElement, errorMessage, validatSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validatSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validatSettings.errorClass);
};

function hideInputError(formElement, inputElement, validatSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validatSettings.inputErrorClass);
  errorElement.classList.remove(validatSettings.errorClass);
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
  });
};

function checkInputValidity(formElement, inputElement, validatSettings) {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
   } else {
      inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validatSettings);
  } else {
    hideInputError(formElement, inputElement, validatSettings);
  }
};

function toggleButtonState(inputList, buttonElement, validatSettings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validatSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validatSettings.inactiveButtonClass);
  }
}; 

function setEventListeners (formElement, validatSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validatSettings.inputSelector));
  const buttonElement = formElement.querySelector(validatSettings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validatSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validatSettings);
      toggleButtonState(inputList, buttonElement, validatSettings);
    });
  });
};

function enableValidation(validatSettings) {
  // validationsSettings = validatSettings;
  const formList = Array.from(document.querySelectorAll(validatSettings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validatSettings);
  });
};

// clearValidation(profileForm, validationConfig);
function clearValidation(formElement, validatSettings ) {
  const inputList = Array.from(formElement.querySelectorAll(validatSettings.inputSelector));
  const buttonElement = formElement.querySelector(validatSettings.submitButtonSelector);
  inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validatSettings);
      toggleButtonState(inputList, buttonElement, validatSettings);
  });
};

export {enableValidation, clearValidation};