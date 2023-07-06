/**
 * @file            Implements logic for 'Pixel Sketcher'.
 * @author          Jude Thaddeau Data
 * @link            https://github.com/jtd-117
* --------------------------------------------------------------------------- */

/**
 * @description (AUXILIARY) DELETES cells from the 'board' div.
 * @param {*}   board The board div & it's ID name
 */
function deleteBoardCells(board) {
    
    // STEP 1: Only delete child elements if they exist
    while (board.childElementCount > 0) {
        
        // STEP 2: Select the first child
        let cell = board.firstElementChild;

        // STEP 3: Delete the first child from the DOM
        board.removeChild(cell)
    }
}
/* -------------------------------------------------------------------------- */
/**
 * @description     (AUXILIARY) ADDS 'dimensions' x 'dimensions' cells to 
 *                  'board' div.
 * @param {*}       board       The board div & it's ID name
 * @param {number}  dimensions  The number of cell rows and columns 'board' 
 *                  will contain
 */
function addBoardCells(board, dimensions) {

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
 * @description Adds cells (i.e. pixels) to the 'board' div according to the 
 *              dimensions specified on the 'pixel-slider' input.
 * @param {*}   board       The board div & it's ID name
 * @param {*}   pixelSlider The pixel slider div & it's ID name
 */
function generateBoard(board, pixelSlider) {

    // STEP 1: Get the dimensions specified on 'pixelSlider'
    const dimensions = pixelSlider.value;

    // STEP 2: Delete all child elements inside 'board'
    deleteBoardCells(board);
    
    // STEP 3: Add cells to the board (i.e. dimensions x dimensions)
    addBoardCells(board, dimensions);
}
/* -------------------------------------------------------------------------- */

// STEP 1: Initialise queried document tags
const board = document.getElementById("board");
const pixelSlider = document.getElementById("pixel-slider");

// STEP 2: Add event listeners to the document tags