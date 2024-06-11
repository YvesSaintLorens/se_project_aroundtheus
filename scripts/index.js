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
  
// Elements
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-card-modal");
const imagePreviewModal = document.querySelector("#modal__image-preview");
const profileEditCloseBtn = profileEditModal.querySelector(".modal__close");
const profileAddCloseBtn = profileAddModal.querySelector(".modal__close");
const imageModalClose = document.querySelector("#modal__close-preview");
const modalImage = document.querySelector(".preview__image");
const modalTitle = document.querySelector(".modal__preview-title");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const profileAddElement = profileAddModal.querySelector("#add-modal-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = profileAddModal.querySelector("input[name='title']");
const cardUrlInput = profileAddModal.querySelector("input[name='url']");

function openModal(modal) {
    modal.classList.add("modal_opened");
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
}

function openImageModal(imageSrc, imageAlt) {
    if (!modalImage) {
        console.error("Modal image element not found");
        return;
    }
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modalTitle.textContent = imageAlt;
    openModal(imagePreviewModal);
}
function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    cardElement.querySelector(".card__title").textContent = cardData.name;

    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", function() {
        likeButton.classList.toggle("card__like-button_active");
    });

    cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
        cardElement.remove();
    });

    cardImageEl.addEventListener("click", () => {
        openImageModal(cardData.link, cardData.name);
    });

    return cardElement;
}

function renderCard(cardData) {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
}

// Event Handlers
function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
}

function handleProfileAddSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({ name, link });
    cardTitleInput.value = ''; 
    cardUrlInput.value = '';   
    closeModal(profileAddModal);
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

// Initialize with initial cards
initialCards.forEach((cardData) => renderCard(cardData));


