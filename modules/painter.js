class Painter {
    currentColor;

    /* Handles colour selection depending on painting mode */
    getColorForCell(cell) {
        return null;
    }
}

export class SingleColorPainter extends Painter {
    // currentColor = `rgba(77, 159, 179, 1.0)`;

    getColorForCell(cell) {
        return this.currentColor;
    }
}

export class RainbowPainter extends Painter {
    variableAlpha = false;
    fixedAlpha = 1.0;

    getColorForCell(cell) {
        return `rgba(
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)},
            ${this.variableAlpha ? Math.random() : this.fixedAlpha}
        )`;
    }
}

export class IncrementalPainter extends SingleColorPainter {
    alphaIncrement = 0.1;

    getColorForCell(cell) {
        const currentCellColor = cell.style.backgroundColor;
        const cellRGBA = this.rgbaStringAsObject(currentCellColor);
        const currentPainterRGBA = this.rgbaStringAsObject(this.currentColor);
        if (this.rgbIsSame(cellRGBA, currentPainterRGBA)) {
            return `rgba(
                ${cellRGBA.r},
                ${cellRGBA.g},
                ${cellRGBA.b},
                ${Math.min(1.0, cellRGBA.a + this.alphaIncrement)}
            )`;
        } else {
            return `rgba(
                ${currentPainterRGBA.r},
                ${currentPainterRGBA.g},
                ${currentPainterRGBA.b},
                ${Math.min(1.0, this.alphaIncrement)}
            )`;
        }
    }

    rgbaStringAsObject(rgbaString) {
        const rgbaAsList = rgbaString.replaceAll(RegExp("[a-z\(\)]", "g"), "").split(",");
        return {
            r: parseFloat(rgbaAsList[0]),
            g: parseFloat(rgbaAsList[1]),
            b: parseFloat(rgbaAsList[2]),
            a: parseFloat(rgbaAsList[3] ?? 1.0)
        }
    }

    rgbIsSame(rgbaOne, rgbaTwo) {
        return (
            (rgbaOne.r == rgbaTwo.r) &
            (rgbaOne.g == rgbaTwo.g) &
            (rgbaOne.b == rgbaTwo.b)
            );
    }
}