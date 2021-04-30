class Sketchpad {
    element;
    sideLength;
    templateCell;
    backgroundColor;

    constructor(element=null, sideLength=50) {
        this.element = element ?? document.querySelector(".js-sketchpad");
        this.sideLength = sideLength;

        this.templateCell = document.querySelector(".js-template-cell");
        this.backgroundColor = this.templateCell.style.backgroundColor;

        this.resize();
        this.makeGrid();
    }

    makeGrid() {
        const totalNumCells = Math.pow(this.sideLength, 2);
        const numCellsNeeded = totalNumCells - this.element.children.length;


        if (numCellsNeeded > 0) {

            this.eraseGrid();

            const fragment = document.createDocumentFragment();
            while (fragment.childElementCount < numCellsNeeded) {
                fragment.append(this.makeCell());
            }
            this.element.append(fragment);

        } else if (numCellsNeeded < 0) {

            while (this.element.children.length > totalNumCells) {
                this.element.lastChild.remove();
            }
            this.eraseGrid();

        }
    }

    makeCell() {
        const newCell = this.templateCell.cloneNode();
        newCell.classList.remove("js-template-cell");
        newCell.style.width = newCell.style.height = `${this.calculateCellSizeAsPercentage()}%`;
        newCell.onmouseenter = (e) => {
            e.target.style.backgroundColor = "steelblue";
        }
        return newCell;
    }

    eraseGrid() {
        for (const childCell of this.element.children) {
            this.eraseCell(childCell);
        }
    }

    eraseCell(cell) {
        cell.style.backgroundColor = this.backgroundColor;
    }

    calculateCellSizeAsPercentage() {
        return 100/this.sideLength;
    }

    resize() {
        const container = this.element.parentElement;
        const targetSize = 0.98 * Math.min(container.offsetWidth, container.offsetHeight);

        this.element.style.height = this.element.style.width = `${targetSize}px`;
    }
}


const sketchpad = new Sketchpad()
window.addEventListener('resize', () => {sketchpad.resize()});