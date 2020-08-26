const form = document.querySelector("form");
const ul = document.querySelector("ul");

const createLiElement = (text) => {
  const li = document.createElement("li");
  const checkButton = document.createElement("button");
  const timesButton = document.createElement("button");
  const buttonGroup = document.createElement("div");
  const p = document.createElement("p");

  checkButton.className = "check-button";
  timesButton.className = "times-button";
  buttonGroup.className = "button-group";

  p.textContent = text;

  buttonGroup.append(checkButton, timesButton);
  li.append(p, buttonGroup);

  return li;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = e.target.content.value;

  console.log(text);
  const li = createLiElement(text);
  ul.append(li);

  e.target.reset();
});
