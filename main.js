import { Sketchpad } from "/modules/sketchpad.js";
import { SingleColorPainter, RainbowPainter, IncrementalPainter } from "/modules/painter.js";

document.querySelector(".js-resize-form").addEventListener("submit", (e) => {e.preventDefault()});
const gridSizeInput = document.querySelector(".js-grid-size-input");

const singleColorPicker = document.querySelector(".js-single-color-picker");

const painters = {
    SINGLE_COLOR_PAINTER: new SingleColorPainter(),
    RAINBOW_PAINTER: new RainbowPainter(),
    INCREMENTAL_PAINTER: new IncrementalPainter()
}

painters.SINGLE_COLOR_PAINTER.currentColor = singleColorPicker.value;
singleColorPicker.addEventListener("change", (e) => {
    /*
    Don't know why this is working. The color input should return lowercase HEX values
    (source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color),
    so I was expecting to have to make a HEX -> RGB converter, but the output values
    seem to already be in rgb format.
    */
    painters.SINGLE_COLOR_PAINTER.currentColor = e.target.value
});

const sketchpad = new Sketchpad(painters.SINGLE_COLOR_PAINTER, gridSizeInput.value);

window.addEventListener('resize', (e) => {sketchpad.resize()});

gridSizeInput.addEventListener("change", (e) => {
    e.target.value = Math.min(Math.max(Math.round(e.target.value), e.target.min), e.target.max);
    sketchpad.updateGridSize(e.target.value)
})

const eraseButton = document.querySelector(".js-erase-button");
eraseButton.addEventListener("click", (e) => {sketchpad.eraseGrid()});

function modeChange(event) {
    switch (this.value) {
        case "one-color":
            sketchpad.currentPainter = painters.SINGLE_COLOR_PAINTER;
            return;
        case "rainbow":
            sketchpad.currentPainter = painters.RAINBOW_PAINTER;
            return;
        case "shading":
            sketchpad.currentPainter = painters.INCREMENTAL_PAINTER;
            return;
        default:
            return;
    }
}
const paintingModeRadios = document.querySelectorAll("input[name=\"painting-mode\"]");
for (var radio of paintingModeRadios) {
    radio.addEventListener("change", modeChange)
};
