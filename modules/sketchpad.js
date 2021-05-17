export class Sketchpad {
    element;
    sideLength;
    templateCell;
    backgroundColor;
    currentPainter; // defer to painter to get colour for target cells

    constructor(painter, sideLength=16) {
        this.currentPainter = painter;

        this.element = document.querySelector(".js-sketchpad");
        this.sideLength = sideLength;

        this.templateCell = document.querySelector(".js-template-cell");
        this.backgroundColor = this.templateCell.style.backgroundColor;

        this.element.addEventListener("mouseover", (e) => {
            // Prevent triggering on whole sketchpad when mousing over border
            if (e.target != e.currentTarget) {
                e.target.style.backgroundColor = this.currentPainter.getColorForCell(e.target);
            }
        })

        this.resize();
        this.makeGrid();
    }

    makeGrid() {
        const totalNumCells = Math.pow(this.sideLength, 2);
        const numCellsNeeded = totalNumCells - this.element.children.length;

        const cellSize = this.calculateCellSizeAsPercentage();

        if (this.element.children.length > 0) {
            this.setCellSize(cellSize);
        }
        
        if (numCellsNeeded > 0) {

            this.eraseGrid();

            const fragment = document.createDocumentFragment();
            while (fragment.childElementCount < numCellsNeeded) {
                fragment.append(this.makeCell(cellSize));
            }
            this.element.append(fragment);

        } else if (numCellsNeeded < 0) {

            while (this.element.children.length > totalNumCells) {
                this.element.lastChild.remove();
            }

            this.eraseGrid();

        }
    }

    makeCell(cellSize) {
        const newCell = this.templateCell.cloneNode();
        newCell.classList.remove("js-template-cell");
        newCell.style.width = newCell.style.height = `${cellSize}%`;

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

    setCellSize(sizeAsPercentage) {
        for (const childCell of this.element.children) {
            childCell.style.width = childCell.style.height = `${sizeAsPercentage}%`;
        }
    }

    resize() {
        const container = this.element.parentElement;
        const targetSize = 0.98 * Math.min(container.offsetWidth, container.offsetHeight);

        this.element.style.height = this.element.style.width = `${targetSize}px`;
    }

    updateGridSize(newSize) {
        this.sideLength = newSize;
        this.makeGrid();
    }
}