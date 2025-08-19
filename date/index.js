const collapseButton = document.querySelector(".collapse");
const block = document.querySelector(".block");

collapseButton.addEventListener("click", () => {
  block.classList.toggle("collapsed");
  collapseButton.classList.toggle("rotated");
});
