export class Card {
    constructor(data, cardSelector, handleImageClick) {
      this._title = data.name;
      this._image = data.link;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector(".card")
        .cloneNode(true);
  
      return cardElement;
    }
  
    _setEventListeners() {
      this._element
        .querySelector(".card__like-button")
        .addEventListener("click", () => {
          this._handleLikeIcon();
        });
  
      this._element
        .querySelector(".card__delete-button")
        .addEventListener("click", () => {
          this._handleDeleteCard();
        });
  
      this._element
        .querySelector(".card__image")
        .addEventListener("click", () => {
          this._handleImageClick(this._image, this._title);
        });
    }
  
    _handleLikeIcon() {
      this._element
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    }
  
    _handleDeleteCard() {
      this._element.remove();
      this._element = null;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector(".card__title").textContent = this._title;
      this._element.querySelector(".card__image").src = this._image;
      this._element.querySelector(".card__image").alt = this._title;
  
      this._setEventListeners();
  
      return this._element;
    }
  }