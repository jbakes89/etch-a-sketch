import { Sketchpad } from "/modules/sketchpad.js";
import { SingleColorPainter, RainbowPainter, IncrementalPainter } from "/modules/painter.js";

export class Controller {

    // UI hooks
    gridSizeInput;
    eraseAllButton;
    paintingModeButtons;
    singleColorPicker;

    sketchpad;
    painters = {
        SINGLE_COLOR_PAINTER: new SingleColorPainter(),
        RAINBOW_PAINTER: new RainbowPainter(),
        INCREMENTAL_PAINTER: new IncrementalPainter()
    }

    constructor() {
        this.bindUI()

        this.sketchpad = new Sketchpad(this.painters.SINGLE_COLOR_PAINTER, this.gridSizeInput.value);
    }

    /* Events */
    resizeWindow(e) {
        this.sketchpad.resize();
    }

    gridSizeChange(e) {
        e.target.value = Math.min(Math.max(Math.round(e.target.value), e.target.min), e.target.max);
        this.sketchpad.updateGridSize(e.target.value)
    }

    eraseAll(e) {
        this.sketchpad.eraseGrid();
    }

    paintingModeChange(e) {
        switch (e.target.value) {
            case "one-color":
                this.sketchpad.currentPainter = this.painters.SINGLE_COLOR_PAINTER;
                return;
            case "rainbow":
                this.sketchpad.currentPainter = this.painters.RAINBOW_PAINTER;
                return;
            case "shading":
                this.sketchpad.currentPainter = this.painters.INCREMENTAL_PAINTER;
                return;
            default:
                return;
        }
    }

    changeColor(e) {
        for (var painter in this.painters) {
            this.painters[painter].currentColor = hexToRGB(e.target.value);
        }
    }

    bindUI() {
        window.addEventListener('resize', e => this.resizeWindow(e));

        // Prevent grid size form submission in "Return" key press
        document.querySelector(".js-resize-form").addEventListener("submit", e => e.preventDefault());

        this.gridSizeInput = document.querySelector(".js-grid-size-input");
        this.gridSizeInput.addEventListener("change", e => this.gridSizeChange(e));

        this.eraseAllButton = document.querySelector(".js-erase-all-button");
        this.eraseAllButton.addEventListener("click", e => this.eraseAll(e));

        this.paintingModeButtons = document.querySelectorAll("input[name=\"painting-mode\"]");
        for (var button of this.paintingModeButtons) {
            button.addEventListener("change", e => this.paintingModeChange(e));
        };

        this.singleColorPicker = document.querySelector(".js-single-color-picker");
        this.singleColorPicker.addEventListener("change", e => this.changeColor(e));

        for (var painter in this.painters) {
            this.painters[painter].currentColor = hexToRGB(this.singleColorPicker.value);
        }
    }
}

/* Utility functions */
function hexToRGB(hexString) {
    const R = parseInt(hexString.slice(1,3), 16);
    const G = parseInt(hexString.slice(3,5), 16);
    const B = parseInt(hexString.slice(5), 16);

    return `rgb(${R},${G},${B})`;
}

function RGBtoRGBA(rgbString, alpha) {
    return `rgba(${rgbString.slice(4,-1)},${alpha})`;
}