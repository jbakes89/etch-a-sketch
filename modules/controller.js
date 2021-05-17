import { Sketchpad } from "/modules/sketchpad.js";
import { RainbowPainter, IncrementalPainter } from "/modules/painter.js";
import { Color } from "/modules/color.js";

export class Controller {

    // UI hooks
    gridSizeInput;
    eraseAllButton;
    paintingModeButtons;
    colorPicker;
    alphaSlider;
    alphaLabel;

    currentColor;

    sketchpad;
    painters = {
        INCREMENTAL_PAINTER: new IncrementalPainter(),
        RAINBOW_PAINTER: new RainbowPainter()
    }

    constructor() {
        this.bindUI()

        this.sketchpad = new Sketchpad(this.painters.INCREMENTAL_PAINTER, this.gridSizeInput.value);
    }

    updateColor() {
        this.currentColor = new Color(this.colorPicker.value);
        this.currentColor.A = this.alphaSlider.value;
        for (var painter in this.painters) {
            this.painters[painter].currentColor = this.currentColor;
        }  
    }

    /* Events */
    resizeWindow(e) {
        this.sketchpad.resize();
    }

    gridSizeChanged(e) {
        e.target.value = Math.min(Math.max(Math.round(e.target.value), e.target.min), e.target.max);
        this.sketchpad.updateGridSize(e.target.value)
    }

    eraseAll(e) {
        this.sketchpad.eraseGrid();
    }

    paintingModeChanged(e) {
        switch (e.target.value) {
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

    colorChanged(e) {
        this.updateColor()
    }

    alphaSliderChanging(e) {
        // update alpha value (displayed next to slider)
        this.alphaLabel.value = e.target.value;
    }

    alphaSliderChanged(e) {
        // update current alpha
        this.updateColor();
    }

    alphaValueChanging(e) {
        this.alphaSlider.value = e.target.value;
    }


    bindUI() {
        window.addEventListener('resize', e => this.resizeWindow(e));

        // Prevent grid size form submission on "Return" key press
        document.querySelector(".js-resize-form").addEventListener("submit", e => e.preventDefault());

        this.gridSizeInput = document.querySelector(".js-grid-size-input");
        this.gridSizeInput.addEventListener("change", e => this.gridSizeChanged(e));

        this.eraseAllButton = document.querySelector(".js-erase-all-button");
        this.eraseAllButton.addEventListener("click", e => this.eraseAll(e));

        this.paintingModeButtons = document.querySelectorAll("input[name=\"painting-mode\"]");
        for (var button of this.paintingModeButtons) {
            button.addEventListener("change", e => this.paintingModeChanged(e));
        };

        this.colorPicker = document.querySelector(".js-color-picker");
        this.colorPicker.addEventListener("change", e => this.colorChanged(e));

        this.alphaSlider = document.querySelector(".js-alpha-slider");
        this.alphaSlider.addEventListener("input", e => this.alphaSliderChanging(e));
        this.alphaSlider.addEventListener("change", e => this.alphaSliderChanged(e));

        this.alphaLabel = document.querySelector(".js-alpha-value");
        this.alphaLabel.addEventListener("input", e => this.alphaValueChanging(e));

        this.updateColor();
    }
}