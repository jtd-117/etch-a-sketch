/**
 * @file            Implements logic for 'Pixel Sketcher'.
 * @author          Jude Thaddeau Data
 * @link            https://github.com/jtd-117
* --------------------------------------------------------------------------- */
/**
 * @description An ENUM for the different 'marker' modes.
 */
const markerModes = Object.freeze({
    Pencil: "pencil",
    Eraser: "eraser",
    NyanCat: "nyan-cat"
});
/* -------------------------------------------------------------------------- */
/**
 * @description     
 * @param {Event}   e 
 */
function changeMarkerMode(e) {
    
    // CASE A: Pencil has been pressed
    if (e.target.getAttribute("id") === markerModes.Pencil) {
        marker = markerModes.Pencil;
        markerColor = pencilColor.value;

    // CASE B: Eraser has been pressed
    } else if (e.target.getAttribute("id") === markerModes.Eraser) {
        marker = markerModes.Eraser;
        markerColor = eraserColor.value;

    // CASE C: Nyan Cat has been pressed
    } else {
        marker = markerModes.NyanCat;
    }
}
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
    markerColor = e.target.value;
}
/* -------------------------------------------------------------------------- */
/**
 * @description     Change's a cell by a given background color
 * @param {Event}   e The 'cell' div triggered by the event
 */
function markCell(e) {

    // STEP 1: Only mark if mouse is being pressed down
    if (isMouseDown === false && e.type !== "mousedown") return;

    // STEP 2: Add/Remove 'marked' class to the cell depending on 'marker'
    if (marker === markerModes.Eraser) {
        e.target.classList.remove("marked");
    } else {
        e.target.classList.add("marked");
    }
    // STEP 3: Change the background color of the cell
    e.target.style.backgroundColor = markerColor;
}
/* -------------------------------------------------------------------------- */
/**
 * @description Clears the entire board with the `eraserColor` value.
 */
function resetBoard() {

    // STEP 1: Get all cells that are BOTH 'marked' & untouched
    let cells = document.querySelectorAll(`div[class="cell"], 
        div[class="cell marked"]`);

    // STEP 2: For each cell remove the 'marked' class & color
    cells.forEach((cell) => {
        cell.classList.remove("marked");
        cell.style.backgroundColor = eraserColor.value;
    });
}
/* -------------------------------------------------------------------------- */
/**
 * @description An ENUM for the differ 'grid' modes.
 */
const gridStyles = Object.freeze({
    None: "None",
    Solid: "Solid",
    Dotted: "Dotted"
});
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */

// STEP 1: Initialise queried document tags
const board = document.getElementById("board");
const pencil = document.getElementById("pencil");
const pencilColor = document.getElementById("pencil-color");
const eraser = document.getElementById("eraser");
const eraserColor = document.getElementById("eraser-color");
const reset = document.getElementById("reset");
const grid = document.getElementById("grid");
const gridColor = document.getElementById("grid-color");
const nyanCat = document.getElementById("nyan-cat");
const size = document.getElementById("size");
const pixelSlider = document.getElementById("pixel-slider");

// STEP : Initialise variables
let marker = markerModes.Pencil;
let markerColor = pencilColor.value;
let gridStyle = gridStyles.None;

/**
 * STEP : Code to check if mouse is being pressed
 * @link https://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down
 */
let isMouseDown = false;
board.onmousedown = () => isMouseDown = true;
board.onmouseup = () => isMouseDown = false;

// STEP : Preload & execute necessary functions
window.onload = generateBoard;

// STEP : Handle day/night toggling


// STEP : Handle pencil functionality
pencil.addEventListener("click", changeMarkerMode);
pencilColor.addEventListener("input", colorSelect);

// STEP : Handle eraser & reset functionality
eraser.addEventListener("click", changeMarkerMode);
eraserColor.addEventListener("input", colorSelect);
reset.addEventListener("click", resetBoard);

// STEP : Handle grid toggling


// STEP : Handle Nyan Cat functionality


// STEP : Handle pixel slider functionality
pixelSlider.addEventListener("input", generateBoard);
