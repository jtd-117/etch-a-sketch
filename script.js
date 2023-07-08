/**
 * @file            Implements logic for 'Pixel Sketcher'.
 * @author          Jude Thaddeau Data
 * @link            https://github.com/jtd-117
* --------------------------------------------------------------------------- */
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

        // STEP 5: Add 'click' event listener to the cell
        cell.addEventListener("mousedown", markCell);

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
    size.textContent = `Dimensions: ${dimensions} x ${dimensions}`;
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

function markCell(e) {

    // STEP 1: Add 'marked' class to the cell
    e.target.classList.add("marked");

    // STEP 2: Change the background color of the cell
    e.target.style.backgroundColor = color;
}

/* -------------------------------------------------------------------------- */

// STEP 1: Initialise queried document tags
const board = document.getElementById("board");
const pixelSlider = document.getElementById("pixel-slider");
const size = document.getElementById("size");
const colorPicker = document.getElementById("color-picker");

// STEP 2: Initialise variables
let mode = null;
let color = colorPicker.value;

// STEP 3: Preload & execute necessary functions
window.onload = function() {
    generateBoard();
}
// STEP 4: Handle board resetting & generation
pixelSlider.addEventListener("input", generateBoard);

// STEP 5: Handle pencil functionality
colorPicker.addEventListener("input", colorSelect);