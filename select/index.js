const collapseButton = document.querySelector(".collapse");
const block = document.querySelector(".block");
const selectButton = document.querySelector(".selectButton");
const selectDropdown = document.querySelector(".selectDropdown");
const selectTitle = document.querySelector(".selectTitle");
const selectInput = document.querySelector(".selectInput");

let activeIndex = -1;
let selectedIndex = -1;

const itemsArray = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"];

function renderItems(array) {
  selectDropdown.querySelectorAll(".dropdownItem").forEach((el) => el.remove());
  array.forEach((itemText, idx) => {
    const div = document.createElement("div");
    div.className = "dropdownItem";
    div.textContent = itemText;
    selectDropdown.appendChild(div);

    div.addEventListener("click", () => {
      selectTitle.textContent = div.textContent;
      selectedIndex = idx;
      selectDropdown.classList.remove("open");
      block.style.maxHeight = "";
      resetActive();
    });
  });
}

renderItems(itemsArray);
let dropdownItems = Array.from(document.querySelectorAll(".dropdownItem"));

collapseButton.addEventListener("click", () => {
  block.classList.toggle("collapsed");
  collapseButton.classList.toggle("rotated");

  if (block.classList.contains("collapsed")) {
    block.style.maxHeight = "";
  }
});

selectButton.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDropdown();
});

selectInput.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!selectDropdown.classList.contains("open")) {
    toggleDropdown();
  }
});

document.addEventListener("click", () => {
  if (selectDropdown.classList.contains("open")) {
    selectDropdown.classList.remove("open");
    block.style.maxHeight = "";
    resetActive();
  }
});

selectInput.addEventListener("input", () => {
  const filter = selectInput.value.toLowerCase();
  dropdownItems.forEach((item) => {
    if (item.textContent.toLowerCase().includes(filter)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
    item.style.background = "";
  });
  activeIndex = -1;
});

selectInput.addEventListener("keydown", (e) => {
  const visibleItems = dropdownItems.filter(
    (item) => item.style.display !== "none"
  );

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (activeIndex < visibleItems.length - 1) activeIndex++;
    highlightActive(visibleItems);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (activeIndex > 0) activeIndex--;
    highlightActive(visibleItems);
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (activeIndex >= 0 && activeIndex < visibleItems.length) {
      selectTitle.textContent = visibleItems[activeIndex].textContent;
      selectedIndex = dropdownItems.indexOf(visibleItems[activeIndex]);
      selectDropdown.classList.remove("open");
      block.style.maxHeight = "";
      resetActive();
    }
  }
});

function toggleDropdown() {
  if (block.classList.contains("collapsed")) {
    block.classList.remove("collapsed");
    collapseButton.classList.add("rotated");
  }

  selectDropdown.classList.toggle("open");

  if (selectDropdown.classList.contains("open")) {
    block.style.maxHeight =
      block.scrollHeight + selectDropdown.scrollHeight + "px";

    if (selectedIndex >= 0) {
      activeIndex = selectedIndex;
      highlightActive(
        dropdownItems.filter((item) => item.style.display !== "none")
      );
    }
  } else {
    block.style.maxHeight = "";
  }
}

function highlightActive(visibleItems) {
  visibleItems.forEach((item, idx) => {
    const globalIdx = dropdownItems.indexOf(item);
    item.style.background =
      globalIdx === activeIndex ? "rgba(65, 112, 255, 1)" : "";
  });
}

function resetActive() {
  activeIndex = -1;
  dropdownItems.forEach((item) => (item.style.background = ""));
}
