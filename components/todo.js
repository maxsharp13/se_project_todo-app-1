export default class Todo {
    constructor(data, selector) {
      this._id = data.id;
      this._name = data.name;
      this._completed = data.completed;
      this._date = data.date;
      this._selector = selector;
    }
  
    _getTemplate() {
      return document
        .querySelector(this._selector)
        .content
        .querySelector(".Todo")
        .cloneNode(true);
    }
  
    _generateNameEl() {
      this._nameEl = this._element.querySelector(".Todo__name");
      this._nameEl.textContent = this._name;
    }
  
    _generateDateEl() {
      this._dateEl = this._element.querySelector(".Todo__date");
      const dueDate = new Date(this._date);
  
      if (!isNaN(dueDate)) {
        this._dateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      }
    }
  
    _generateCheckboxEl() {
      this._checkboxEl = this._element.querySelector(".Todo__completed");
      this._checkboxLabel = this._element.querySelector(".Todo__label");
  
      this._checkboxEl.checked = this._completed;
      this._checkboxEl.id = `todo-${this._id}`;
      this._checkboxLabel.setAttribute("for", `todo-${this._id}`);
    }
  
    _setEventListeners() {
      this._deleteBtnEl.addEventListener("click", () => {
        this._element.remove();
      });
  
      this._checkboxEl.addEventListener("change", () => {
        this._completed = !this._completed;
      });
    }
  
    getView() {
      this._element = this._getTemplate();
      this._deleteBtnEl = this._element.querySelector(".Todo__delete-btn");
  
      this._generateNameEl();
      this._generateDateEl();
      this._generateCheckboxEl();
      this._setEventListeners();
  
      return this._element;
    }
  }
  