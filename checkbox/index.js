const collapseButton = document.querySelector(".collapse");
const block = document.querySelector(".block");

collapseButton.addEventListener("click", () => {
  block.classList.toggle("collapsed");
});

const pages = Array.from({ length: 10 }, (_, i) => `Page${i + 1}`);

pages.map((page) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("checkboxWrapper");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  const title = document.createElement("div");
  title.classList.add("checkboxTitle");
  title.textContent = page;

  wrapper.appendChild(checkbox);
  wrapper.appendChild(title);

  block.appendChild(wrapper);
});
