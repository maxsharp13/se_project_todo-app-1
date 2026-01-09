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
  
    _toggleButtonState() {
      const hasInvalidInput = this._inputs.some(
        (input) => !input.validity.valid
      );
  
      if (hasInvalidInput) {
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
          this._toggleButtonState();
        });
      });
    }
  
    resetValidation() {
      this._form.reset();
      this._toggleButtonState();
    }
  
    enableValidation() {
      this._setEventListeners();
    }
  }
  