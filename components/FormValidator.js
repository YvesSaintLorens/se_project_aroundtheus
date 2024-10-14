// FormValidator.js
export function enableValidation(config) {
    const formEls = [...document.querySelectorAll(config.formSelector)];
    formEls.forEach((formEl) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      setEventListeners(formEl, config);
    });
  }
  
  function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }
  
  function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }
  
  function checkInputValidity(formEl, inputEl, config) {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, config);
    } else {
      hideInputError(formEl, inputEl, config);
    }
  }
  
  function hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }
  
  function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    }
  }
  
  function setEventListeners(formEl, config) {
    const inputEls = [...formEl.querySelectorAll(config.inputSelector)];
    const submitButton = formEl.querySelector(config.submitButtonSelector);
  
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        checkInputValidity(formEl, inputEl, config);
        toggleButtonState(inputEls, submitButton, config);
      });
    });
  }