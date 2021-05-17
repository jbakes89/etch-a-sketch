import { Color } from "/modules/color.js";

class Painter {
    currentColor;
    currentAlpha = 1.0;

    /* Handles colour selection depending on painting mode */
    getColorForCell(cell) {
        return null;
    }
}

export class RainbowPainter extends Painter {
    variableAlpha = false;

    getColorForCell(cell) {
        return `rgba(
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)},
            ${this.variableAlpha ? Math.random() : this.currentColor.A}
        )`;
    }
}

export class IncrementalPainter extends Painter {

    getColorForCell(cell) {
        const currentCellColor = new Color(cell.style.backgroundColor);
        // if (this.currentColor.isSameAs(currentCellColor, true)) {
        //     const newColor = this.currentColor.clone();
        //     const incrementedAlpha = parseFloat(newColor.A) + parseFloat(currentCellColor.A);
        //     newColor.A = Math.min(1.0, incrementedAlpha);
        //     return newColor.asString()
        // } else {
        //     return this.currentColor.asString();
        // }

        return this.currentColor.blendOver(currentCellColor).asString();
    }
}