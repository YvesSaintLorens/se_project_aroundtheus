import { FormValidator } from '../components/FormValidator.js'; 
import { Card } from '../components/Card.js';

// Data
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Validation configuration object
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Elements
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-card-modal");
const imagePreviewModal = document.querySelector("#modal__image-preview");
const profileEditCloseBtn = profileEditModal.querySelector(".modal__close");
const profileAddCloseBtn = profileAddModal.querySelector(".modal__close");
const imageModalClose = document.querySelector("#modal__close-preview");
const modalImage = document.querySelector(".modal__preview-image");
const modalTitle = document.querySelector(".modal__preview-title");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const profileAddElement = profileAddModal.querySelector("#add-modal-form");
const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

// Open Modal
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("mousedown", closeModalOnOverlay);
  document.addEventListener("keydown", closeModalOnEsc);
}

// Close Modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("mousedown", closeModalOnOverlay);
  document.removeEventListener("keydown", closeModalOnEsc);
}

// Open Image Preview Modal
function openImageModal(imageSrc, imageAlt) {
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;
  modalTitle.textContent = imageAlt;
  openModal(imagePreviewModal);
}

function createCard(cardData) {
  const card = new Card(cardData, '#card-template', openImageModal);
  return card.generateCard();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

// Handle Profile Edit Submit
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

// Handle Add New Card Submit
function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  cardTitleInput.value = ''; 
  cardUrlInput.value = ''; 
  cardFormValidator.toggleButtonState(); 
  closeModal(profileAddModal);
}

// Close Modal on Overlay Click
function closeModalOnOverlay(e) {
  if (e.target.classList.contains('modal_opened')) {
    closeModal(e.target);
  }
}

// Close Modal with ESC key
function closeModalOnEsc(e) {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileAddBtn.addEventListener("click", () => openModal(profileAddModal));

profileEditCloseBtn.addEventListener("click", () => closeModal(profileEditModal));
profileAddCloseBtn.addEventListener("click", () => closeModal(profileAddModal));
imageModalClose.addEventListener("click", () => closeModal(imagePreviewModal));

profileFormElement.addEventListener("submit", handleProfileEditSubmit);
profileAddElement.addEventListener("submit", handleProfileAddSubmit);

// Initialize cards using the Card class
initialCards.forEach((cardData) => renderCard(cardData));

// Initialize form validation
const profileFormValidator = new FormValidator(config, profileFormElement);
const cardFormValidator = new FormValidator(config, profileAddElement);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();