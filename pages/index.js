import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";


const addTodoButton = document.querySelector(".button_action_add");
const todosListSelector = ".todos__list";
const todoTemplateSelector = "#todo-template";

const addTodoForm = document.forms["add-todo-form"];


const todoCounter = new TodoCounter(initialTodos, ".counter__text");


const renderTodo = (item) => {
  const todo = new Todo(item, todoTemplateSelector, {
    handleDelete: (completed) => {
      todoCounter.updateTotal(false);
      if (completed) {
        todoCounter.updateCompleted(false);
      }
    },
    handleToggle: (checked) => {
      todoCounter.updateCompleted(checked);
    },
  });

  const todoElement = todo.getView();
  todoSection.addItem(todoElement);
};

const todoSection = new Section(
  {
    items: initialTodos,
    renderer: renderTodo,
  },
  todosListSelector
);

todoSection.renderItems();

const popupWithForm = new PopupWithForm("#add-todo-popup", (data) => {
  const todoData = {
    id: uuidv4(),
    name: data.name,
    date: new Date(data.date),
    completed: false,
  };

  renderTodo(todoData);
  todoCounter.updateTotal(true);

  formValidator.resetValidation();
  popupWithForm.close();
});

popupWithForm.setEventListeners();


const formValidator = new FormValidator(
  validationConfig,
  addTodoForm
);

formValidator.enableValidation();


addTodoButton.addEventListener("click", () => {
  popupWithForm.open();
});
