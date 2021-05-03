import { Sketchpad } from "/modules/sketchpad.js";
import { Painter } from "/modules/painter.js";

document.querySelector(".js-resize-form").addEventListener("submit", (e) => {e.preventDefault()});
const gridSizeInput = document.querySelector(".js-grid-size-input");

const sketchpad = new Sketchpad(gridSizeInput.value);
sketchpad.painter = new Painter();

window.addEventListener('resize', (e) => {sketchpad.resize()});

gridSizeInput.addEventListener("change", (e) => {
    e.target.value = Math.min(Math.max(Math.round(e.target.value), e.target.min), e.target.max);
    sketchpad.updateGridSize(e.target.value)
})

const eraseButton = document.querySelector(".js-erase-button");
eraseButton.addEventListener("click", (e) => {sketchpad.eraseGrid()});