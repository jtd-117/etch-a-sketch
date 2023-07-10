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
        board.style.cursor = `auto`;

    // CASE B: Eraser has been pressed
    } else if (e.target.getAttribute("id") === markerModes.Eraser) {
        marker = markerModes.Eraser;
        markerColor = eraserColor.value;
        board.style.cursor = `auto`;

    // CASE C: Nyan Cat has been pressed
    } else {
        marker = markerModes.NyanCat;
        board.style.cursor = `url("images/nyan-cat-cursor.png"), auto`;
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
        cell = document.createElement('div');

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
    // STEP 7: Add any grid effect if any
    if (gridStyle !== gridStyles.None) {

        // STEP 7A: Get all cells
        let cells = document.querySelectorAll(`div[class="cell"], 
            div[class="cell marked"]`);

        // STEP 7B: Adjust the cell's border style accordingly
        cells.forEach((cell) => {
            if (gridStyle === gridStyles.Solid) {
                cell.style.borderStyle = gridStyles.Solid;
            } else {
                cell.style.borderStyle = gridStyles.Dotted;
            }
        });
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
 * @description     Adjusts the color-based variables to match the selected 
 *                  input.
 * @param {Event}   e The selected 'color' input
 */
function colorSelect(e) {
    
    // CASE A: Changing the maker's color
    if (e.target.getAttribute("id") !== "grid-color") {
        markerColor = e.target.value;

    // CASE B: Changing the grid's color
    } else {
        let cells = document.querySelectorAll(`div[class="cell"], 
            div[class="cell marked"]`);
        cells.forEach((cell) => {
            cell.style.borderColor = `${gridColor.value}`;
        });
    }
}
/* -------------------------------------------------------------------------- */

/**
 * @description         Randomly generates a HEX value as a string.
 * @returns {string}    A random HEX value
 */
function generateRandomHex() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

/* -------------------------------------------------------------------------- */
/**
 * @description     Change's a cell by a given background color.
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
    // STEP 3: Change the background color of the cell depending on 'marker'
    if (marker === markerModes.NyanCat) {
        e.target.style.backgroundColor = generateRandomHex();
    } else {
        e.target.style.backgroundColor = markerColor;
    }
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
/**
 * @description     Changes the grid style whenever the 'grid' button 
 *                  is pressed.
 * @param {Event}   e The event triggered by the 'grid' button
 */
function changeGridStyle(e) {

    // STEP 1: Get all cells
    let cells = document.querySelectorAll(`div[class="cell"], 
        div[class="cell marked"]`);

    // CASE 2A: 'None' transitions to 'Solid'
    if (e.target.value === gridStyles.None) {
        gridStyle = gridStyles.Solid;
        grid.value = `${gridStyles.Solid}`;
        cells.forEach((cell) => {
            cell.style.border = `1px ${gridStyles.Solid} ${gridColor.value}`;
        });

    // CASE 2B: 'Solid' transitions to 'Dotted'
    } else if (e.target.value === gridStyles.Solid) {
        gridStyle = gridStyles.Dotted;
        grid.value = `${gridStyles.Dotted}`;
        cells.forEach((cell) => {
            cell.style.border = `1px ${gridStyles.Dotted} ${gridColor.value}`;
        });

    // CASE 2C: 'Dotted' transitions to 'None'
    } else {
        gridStyle = gridStyles.None;
        grid.value = `${gridStyles.None}`;
        cells.forEach((cell) => {
            cell.style.border = `0`;
        });
    }
}
/* -------------------------------------------------------------------------- */
/**
 * @description Plays the audio stored in the HTML tag with `id`.
 * @param       {string} id The HTML tag that contains the audio
 */
function playAudio(id) {

    // STEP 1: Locate the audio in the DOM
    const audio = document.getElementById(id);

    // STEP 2: Execute the media if it exists
    if (!audio) return;
    audio.play();
}
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

// STEP 2: Initialise variables
let marker = markerModes.Pencil;
let markerColor = pencilColor.value;
let gridStyle = gridStyles.None;

/**
 * STEP 3: Code to check if mouse is being pressed
 * @link https://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down
 */
let isMouseDown = false;
board.onmousedown = () => isMouseDown = true;
board.onmouseup = () => isMouseDown = false;

// STEP 4: Preload & execute necessary functions
window.onload = generateBoard;

// STEP 5: Handle day/night toggling


// STEP 6: Handle pencil functionality
pencil.addEventListener("click", changeMarkerMode);
pencilColor.addEventListener("input", colorSelect);
pencil.addEventListener("click", () => playAudio("pencil-mp3"));

// STEP 7: Handle eraser & reset functionality
eraser.addEventListener("click", changeMarkerMode);
eraserColor.addEventListener("input", colorSelect);
eraser.addEventListener("click", () => playAudio("eraser-mp3"));
reset.addEventListener("click", resetBoard);
reset.addEventListener("click", () => playAudio("reset-mp3"));

// STEP 8: Handle grid toggling
grid.addEventListener("click", changeGridStyle);
gridColor.addEventListener("input", colorSelect);
grid.addEventListener("click", () => playAudio("grid-mp3"));

// STEP 9: Handle Nyan Cat functionality
nyanCat.addEventListener("click", changeMarkerMode);
nyanCat.addEventListener("click", () => playAudio("nyan-mp3"));

// STEP 10: Handle pixel slider functionality
pixelSlider.addEventListener("input", generateBoard);
pixelSlider.addEventListener("input", () => playAudio("slider-mp3"));