import { Sketchpad } from "/modules/sketchpad.js";
import { Painter, RainbowPainter } from "/modules/painter.js";
import { Color } from "/modules/color.js";

export class Controller {

    // UI hooks
    gridSizeInput;
    eraseAllButton;
    paintingModeButtons;
    colorPicker;
    alphaSlider;
    alphaLabel;
    colorLabel;
    rainbowLabel;
    rainbowLabelMask;

    currentColor;
    currentPainter;

    sketchpad;
    painters = {
        BASIC: new Painter(),
        RAINBOW: new RainbowPainter()
    }

    constructor() {
        this.bindUI()

        this.sketchpad = new Sketchpad(this.gridSizeInput.value);
        this.sketchpad.controller = this;

        this.currentPainter = this.painters.BASIC;
    }

    updateColor() {
        this.currentColor = new Color(this.colorPicker.value);
        this.currentColor.A = this.alphaSlider.value;
        this.colorLabel.style.backgroundColor = this.currentColor.asString();
        this.rainbowLabelMask.style.opacity = `${0.8 - 0.8*this.currentColor.A}`;
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
        this.rainbowLabel.classList.toggle("js-inactive-label");
        this.colorLabel.classList.toggle("js-inactive-label");
        switch (e.target.value) {
            case "rainbow":
                this.currentPainter = this.painters.RAINBOW;
                return;
            case "shading":
                this.currentPainter = this.painters.BASIC;
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
        this.updateColor();
    }

    alphaLabelChanging(e) {
        this.alphaSlider.value = e.target.value;
        this.updateColor();
    }

    bindUI() {
        window.addEventListener('resize', e => this.resizeWindow(e));

        this.gridSizeInput = document.querySelector(".js-grid-size-input");
        this.gridSizeInput.addEventListener("change", e => this.gridSizeChanged(e));

        this.eraseAllButton = document.querySelector(".js-erase-all-button");
        this.eraseAllButton.addEventListener("click", e => this.eraseAll(e));

        this.paintingModeButtons = document.querySelectorAll("input[name=\"painting-mode\"]");
        for (var button of this.paintingModeButtons) {
            button.addEventListener("change", e => this.paintingModeChanged(e));
        };

        this.colorPicker = document.querySelector(".js-color-picker");
        this.colorPicker.addEventListener("input", e => this.colorChanged(e));
        this.colorPicker.addEventListener("click", e => document.querySelector("input[name=\"painting-mode\"]").click());

        this.alphaSlider = document.querySelector(".js-alpha-slider");
        this.alphaSlider.addEventListener("input", e => this.alphaSliderChanging(e));

        this.alphaLabel = document.querySelector(".js-alpha-value");
        this.alphaLabel.addEventListener("input", e => this.alphaLabelChanging(e));

        this.colorLabel = document.querySelector(".js-color-input-wrapper");

        this.rainbowLabel = document.querySelector(".js-rainbow-label");
        this.rainbowLabelMask = document.querySelector(".js-rainbow-label-mask");

        this.updateColor();
    }
}