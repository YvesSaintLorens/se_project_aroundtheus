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
    return inputList.some((inputEl) => !inputEl.validity.valid);
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
    const inputEls = Array.from(formEl.querySelectorAll(config.inputSelector));
    const submitButton = formEl.querySelector(config.submitButtonSelector);

    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", () => {
            checkInputValidity(formEl, inputEl, config);
            toggleButtonState(inputEls, submitButton, config);
        });
    });
}

function enableValidation(config) {
    const formEls = Array.from(document.querySelectorAll(config.formSelector));
    formEls.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => e.preventDefault());
        setEventListeners(formEl, config);
    });
}

enableValidation({
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
});