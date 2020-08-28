const ul = document.querySelector("ul");

const getTodos = () => {
  const stringifiedTodos = localStorage.getItem("todos");

  if (!stringifiedTodos) {
    return [];
  }

  return JSON.parse(stringifiedTodos);
};

const saveTodos = (todos) => {
  const stringifiedTodos = JSON.stringify(todos);

  localStorage.setItem("todos", stringifiedTodos);
};

function toggleTodo() {
  const currentLiElement = this.parentElement.parentElement;
  const isComplete = currentLiElement.dataset.complete === "true";
  const todos = getTodos();

  const newTodos = todos.map((todo) => {
    if (todo.id === id) {
      todo.complete = !isComplete;
    }

    return todo;
  });

  saveTodos(newTodos);

  currentLiElement.dataset.complete = !isComplete;
}

function removeTodo() {
  const currentLiElement = this.parentElement.parentElement;
  const { id } = currentLiElement.dataset;

  currentLiElement.className = "remove-todo";

  const todos = getTodos();
  const newTodos = todos.filter((todo) => todo.id !== id);
  saveTodos(newTodos);

  setTimeout(() => {
    currentLiElement.remove();
  }, 500);
}

function filterTodos() {
  const { children } = ul;

  for (let i = 0; i < children.length; i++) {
    const element = children[i];
    const isComplete = element.dataset.complete === "true";

    if (this.value === "COMPLETE") {
      element.style.display = isComplete ? "flex" : "none";
    } else if (this.value === "UNCOMPLETE") {
      element.style.display = isComplete ? "none" : "flex";
    } else {
      element.style.display = "flex";
    }
  }
}

const createLiElement = (text, id) => {
  const li = document.createElement("li");
  const checkButton = document.createElement("button");
  const timesButton = document.createElement("button");
  const buttonGroup = document.createElement("div");
  const p = document.createElement("p");

  checkButton.className = "check-button";
  timesButton.className = "times-button";
  buttonGroup.className = "button-group";

  checkButton.addEventListener("click", toggleTodo);
  timesButton.addEventListener("click", removeTodo);

  p.textContent = text;
  li.dataset.complete = false;
  li.dataset.id = id;

  buttonGroup.append(checkButton, timesButton);
  li.append(p, buttonGroup);

  return li;
};

const createId = () =>
  Math.random()
    .toString(36)
    .substr(2, 5);

const addTodo = (e) => {
  e.preventDefault();

  const text = e.target.content.value;

  if (text) {
    const id = createId();
    const todos = getTodos();

    const li = createLiElement(text, id);
    const todo = { text, id };

    ul.append(li);
    saveTodos([...todos, todo]);

    e.target.reset();
  }
};

const handleLoad = () => {
  const todos = getTodos();
  const liElements = todos.map(({ text, id }) => createLiElement(text, id));

  ul.append(...liElements);
};

const form = document.querySelector("form");
const select = document.querySelector("select");

window.addEventListener("load", handleLoad);
form.addEventListener("submit", addTodo);
select.addEventListener("change", filterTodos);
