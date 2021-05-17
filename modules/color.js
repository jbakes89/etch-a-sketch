export class Color {
    
    R;G;B;A;

    constructor(color) {
        if (arguments.length == 1) {
            if (/#(\w{6,8})/.test(color)) { // Hex string
                this.R = parseInt(color.slice(1,3), 16);
                this.G = parseInt(color.slice(3,5), 16);
                this.B = parseInt(color.slice(5,7), 16);
                this.A = (parseInt(color.slice(7,9), 16) || 255)/255;
            } else if (/rgb(?:a)?\((?:\d*,\s){2,3}(?:\d+(?:\.\d+)?)?\)/.test(color)) { // RGB(A) string
                const rgbaAsList = color.replaceAll(RegExp("[a-z\(\)]", "g"), "").split(",");
                this.R = parseInt(rgbaAsList[0]);
                this.G = parseInt(rgbaAsList[1]);
                this.B = parseInt(rgbaAsList[2]);
                this.A = parseFloat(rgbaAsList[3] ?? 1.0);
            } else { // Default to white
                this.R = this.G = this.B = 255;
                this.A = 1.0;
            }
        } else if (arguments.length > 3) { // R,G,B(, A) given as separate values
            this.R = arguments[0]; this.G = arguments[1]; this.B = arguments [2];
            this.A = arguments[3] ?? 1.0;
        }
    }

    asString() {
        return `rgba(${this.R},${this.G},${this.B},${this.A})`;
    }

    isSameAs(otherColor, ignoreAlpha=false) {
        return (
            this.R == otherColor.R &&
            this.G == otherColor.G &&
            this.B == otherColor.B &&
            (ignoreAlpha || (this.A == otherColor.A))
        )
    }

    clone() {
        return new Color(this.R, this.G, this.B, this.A);
    }

    blendOver(otherColor) {
        const colA = [this.R/255, this.G/255, this.B/255]; const alphaA = parseFloat(this.A);
        const colB = [otherColor.R/255, otherColor.G/255, otherColor.B/255]; const alphaB = parseFloat(otherColor.A);

        let colOut = [];
        for (var i = 0; i < 3; i++) {
            colOut[i] = (
                (colA[i] * alphaA) +
                (colB[i] * alphaB * (1 - alphaA))
            );
        }
        const alphaOut = alphaA + (alphaB * (1 - alphaA));

        return new Color(
            parseInt(colOut[0]*255),
            parseInt(colOut[1]*255),
            parseInt(colOut[2]*255),
            alphaOut
        );
    }
}