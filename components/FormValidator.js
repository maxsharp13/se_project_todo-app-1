export default class FormValidator {
    constructor(settings, formElement) {
      this._settings = settings;
      this._form = formElement;
      this._inputs = Array.from(
        formElement.querySelectorAll(settings.inputSelector)
      );
      this._button = formElement.querySelector(
        settings.submitButtonSelector
      );
    }
  
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._form.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._form.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);
    }
  
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(
          inputElement,
          inputElement.validationMessage
        );
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _hasInvalidInput() {
      return this._inputs.some(
        (inputElement) => !inputElement.validity.valid
      );
    }
  
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._button.classList.add(this._settings.inactiveButtonClass);
        this._button.disabled = true;
      } else {
        this._button.classList.remove(this._settings.inactiveButtonClass);
        this._button.disabled = false;
      }
    }
  
    _setEventListeners() {
      this._toggleButtonState();
  
      this._inputs.forEach((input) => {
        input.addEventListener("input", () => {
          this._checkInputValidity(input);
          this._toggleButtonState();
        });
      });
    }
  
    resetValidation() {
      this._form.reset();
      this._inputs.forEach((input) => {
        this._hideInputError(input);
      });
      this._toggleButtonState();
    }
  
    enableValidation() {
      this._setEventListeners();
    }
  }
  