const collapseButton = document.querySelector(".collapse");
const block = document.querySelector(".block");

collapseButton.addEventListener("click", () => {
  block.classList.toggle("collapsed");
  collapseButton.classList.toggle("rotated");
});

const thumb = document.querySelector(".sliderThumb");
const track = document.querySelector(".sliderTrack");
const currentValue = document.querySelector(".currentValue");
const minValueLabel = document.querySelector(".minValue");
const maxValueLabel = document.querySelector(".maxValue");

const sliderState = { min: 0, max: 100, value: 0 };

function setSliderRange(min, max, startValue = min) {
  sliderState.min = min;
  sliderState.max = max;
  sliderState.value = startValue;

  minValueLabel.textContent = min;
  maxValueLabel.textContent = max;

  updateThumbSize();
  setThumbPosition(startValue);
  centerCurrentValue();
}

function updateThumbSize() {
  const trackRect = track.getBoundingClientRect();
  const range = sliderState.max - sliderState.min;

  const minPercent = 0.05;
  const maxPercent = 0.9;

  const ratio = Math.min(1, 100 / range);
  const thumbPercent = minPercent + (maxPercent - minPercent) * ratio;

  const thumbWidth = trackRect.width * thumbPercent;
  thumb.style.width = `${thumbWidth}px`;
}

function centerCurrentValue() {
  currentValue.textContent = sliderState.value;
}

function setThumbPosition(value) {
  sliderState.value = value;

  const trackRect = track.getBoundingClientRect();
  const thumbWidth = thumb.offsetWidth;
  const availableWidth = trackRect.width - thumbWidth;

  const ratio = (value - sliderState.min) / (sliderState.max - sliderState.min);
  const x = Math.max(0, Math.min(ratio * availableWidth, availableWidth));

  thumb.style.left = `${x}px`;
}

let isDragging = false;

thumb.addEventListener("mousedown", () => (isDragging = true));
document.addEventListener("mouseup", () => (isDragging = false));

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const trackRect = track.getBoundingClientRect();
  const thumbWidth = thumb.offsetWidth;
  const availableWidth = trackRect.width - thumbWidth;

  let x = e.clientX - trackRect.left - thumbWidth / 2;
  x = Math.max(0, Math.min(x, availableWidth));

  thumb.style.left = `${x}px`;

  const ratio = x / availableWidth;
  const value = Math.round(
    sliderState.min + ratio * (sliderState.max - sliderState.min)
  );
  sliderState.value = value;

  currentValue.textContent = value;
});

setSliderRange(1000, 1500, 1200);
