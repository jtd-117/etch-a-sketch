/**
 * @file            Implements logic for 'Pixel Sketcher'.
 * @author          Jude Thaddeau Data
 * @link            https://github.com/jtd-117
* --------------------------------------------------------------------------- */
/**
 * @description An ENUM for the different MARKER modes.
 */
const markerModes = Object.freeze({
    Pencil: "pencil",
    Eraser: "eraser",
    NyanCat: "nyan-cat"
});
/* -------------------------------------------------------------------------- */
/**
 * @description     (AUXILIARY) ADDS 'dimensions' x 'dimensions' cells to 
 *                  'board' div.
 * @param {number}  dimensions 
 */
function addBoardCells(dimensions) {

    // STEP 1: Adjust the grid's rows & columns
    board.style.gridTemplateRows = `repeat(${dimensions}, 1fr)`;
    board.style.gridTemplateColumns = `repeat(${dimensions}, 1fr)`;

    // STEP 2: Keep adding cells according to dimensions
    let cell = null;
    for (let i = 0; i < dimensions * dimensions; i++) {

        // STEP 3: Initialise the new cell
        cell = document.createElement('div')

        // STEP 4: Add 'cell' class
        cell.classList.add("cell");

        /**
         * STEP 5: Add 'mousedown' & 'mouseover' event listeners to the cell
         * NOTES:
         *  - 'mouseover' event ONLY enables click & drag behaviour
         *  - 'mousedown' event ONLY enables click behaviour
         */
        cell.addEventListener("mousedown", markCell);
        cell.addEventListener("mouseover", markCell);

        // STEP 6: Add cell to 'board' DOM
        board.appendChild(cell);
    }
}
/* -------------------------------------------------------------------------- */
/**
 * @description     Adds cells (i.e. pixels) to the 'board' div according to 
 *                  the dimensions specified on the 'pixel-slider' input & 
 *                  displays the board dimensions.
 */
function generateBoard() {

    // STEP 1: Get the dimensions specified on 'pixelSlider'
    const dimensions = pixelSlider.value;

    // STEP 2: Delete all child elements inside 'board'
    board.innerHTML = "";
    
    // STEP 3: Add cells to the board (i.e. dimensions x dimensions)
    addBoardCells(dimensions);

    // STEP 4: Display the board dimensions
    size.textContent = `Size: ${dimensions} x ${dimensions}`;
}
/* -------------------------------------------------------------------------- */
/**
 * @description     Adjusts the 'color' variable to match the selected input
 * @param {Event}   e The selected 'color' input
 */
function colorSelect(e) {
    color = e.target.value;
}
/* -------------------------------------------------------------------------- */
/**
 * @description     Change's a cell by a given background color
 * @param {Event}   e The 'cell' div triggered by the event
 */
function markCell(e) {

    // STEP : Only mark if mouse is being pressed down
    if (isMouseDown === false && e.type !== "mousedown") return;

    // STEP : Add 'marked' class to the cell
    e.target.classList.add("marked");

    // STEP : Change the background color of the cell
    e.target.style.backgroundColor = color;
}
/* -------------------------------------------------------------------------- */

// STEP : Initialise queried document tags
const board = document.getElementById("board");
const pixelSlider = document.getElementById("pixel-slider");
const size = document.getElementById("size");
const pencilColor = document.getElementById("pencil-color");

// STEP : Initialise variables
let marker = markerModes.Pencil;
let color = pencilColor.value;

/**
 * STEP : Code to check if mouse is being pressed
 * @link https://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down
 */
let isMouseDown = false;
board.onmousedown = () => isMouseDown = true;
board.onmouseup = () => isMouseDown = false;

// STEP : Preload & execute necessary functions
window.onload = function() {
    generateBoard();
}
// STEP : Handle day/night toggling


// STEP : Handle board resetting & generation
pixelSlider.addEventListener("input", generateBoard);

// STEP : Handle pencil functionality
pencilColor.addEventListener("input", colorSelect);

// STEP : Handle eraser & reset functionality


// STEP : Handle grid toggling
