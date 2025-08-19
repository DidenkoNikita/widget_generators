const titles = ["All", "BMW", "Mercedes", "Lamborgini", "Ferrari", "Bugatti"];

const buttonsWrapper = document.querySelector(".buttonsWrapper");

titles.forEach((title) => {
  const button = document.createElement("button");
  button.classList.add("filterButton");

  const div = document.createElement("div");
  div.classList.add("filterButtonTitle");
  div.textContent = title;

  button.appendChild(div);
  buttonsWrapper.appendChild(button);

  button.addEventListener("click", () => {
    document
      .querySelectorAll(".filterButton")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

const collapseButton = document.querySelector(".collapse");
const block = document.querySelector(".block");

collapseButton.addEventListener("click", () => {
  block.classList.toggle("collapsed");
  collapseButton.classList.toggle("rotated");
});
