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

    // STEP 1: Keep adding cells according to dimensions
    let cell = null;
    for (let i = 0; i < dimensions * dimensions; i++) {

        // STEP 2: Initialise the new cell
        cell = document.createElement('div')

        // STEP 3: Add 'cell' class
        cell.classList.add("cell");

        // STEP 4: Add cell to 'board' DOM
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
    size.textContent = `${dimensions} x ${dimensions}`;
}
/* -------------------------------------------------------------------------- */

// STEP 1: Initialise queried document tags
const board = document.getElementById("board");
const pixelSlider = document.getElementById("pixel-slider");
const size = document.getElementById("size");

// STEP 2: Handle board resetting & generation
window.onload = generateBoard;
pixelSlider.addEventListener("input", generateBoard);