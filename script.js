/**
 * @file        script.js
 * @description Implements logic for 'Pixel Sketcher'
 * @author      Jude Thaddeau Data
 * @link        GitHub: https://github.com/jtd-117
 */

/**
 * @description An ENUM for the different 'marker' modes.
 */
const markerModes = Object.freeze({
    Pencil: "pencil",
    Eraser: "eraser",
    NyanCat: "nyan-cat"
});

/**
 * @description Determines the value of the 'marker' variable & returns the 
 *              associated tag.
 * @param       {markerModes} marker The current 'markerModes' value
 * @returns     {markerModes} One of 'pencil', 'eraser' or 'nyanCat' variables 
 *              which represent queried input tags
 */
function getMarkerTag(marker) {

    if (marker === markerModes.Pencil) return pencil;
    else if (marker === markerModes.Eraser) return eraser;
    return nyanCat;
}

/**
 * @description     Changes the 'marker' value according to the button pressed.
 * @param {Event}   e The event triggered by the 'pencil', 'eraser' & 
 *                    'nyan-cat' button
 */
function changeMarkerMode(e) {

    let markerMode = getMarkerTag(marker);
    markerMode.classList.remove("marker");

    if (e.target.getAttribute("id") === markerModes.Pencil) {
        marker = markerModes.Pencil;
        markerColor = pencilColor.value;
        board.style.cursor = `url("images/pencil-cursor.gif"), auto`;

    } else if (e.target.getAttribute("id") === markerModes.Eraser) {
        marker = markerModes.Eraser;
        markerColor = eraserColor.value;
        board.style.cursor = `url("images/eraser-cursor.gif"), auto`;

    } else {
        marker = markerModes.NyanCat;
        board.style.cursor = `url("images/nyan-cat-cursor.gif"), auto`;
    }
    markerMode = getMarkerTag(marker);
    markerMode.classList.add("marker");
}

/**
 * @description     (AUXILIARY) ADDS 'dimensions' x 'dimensions' cells to 
 *                  'board' div.
 * @param {number}  dimensions The number of pixels for width & height
 */
function addBoardCells(dimensions) {

    board.style.gridTemplateRows = `repeat(${dimensions}, 1fr)`;
    board.style.gridTemplateColumns = `repeat(${dimensions}, 1fr)`;

    let cell = null;
    for (let i = 0; i < dimensions * dimensions; i++) {

        cell = document.createElement('div');
        cell.classList.add("cell");
        cell.style.backgroundColor = eraserColor.value;

        // - 'mouseover' event ONLY enables click & drag behaviour
        // - 'mousedown' event ONLY enables click behaviour
        cell.addEventListener("mousedown", markCell);
        cell.addEventListener("mouseover", markCell);
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
                cell.style.border = `0.1px ${gridStyles.Solid} ${gridColor.value}`;
            } else {
                cell.style.border = `0.1px ${gridStyles.Dotted} ${gridColor.value}`;
            }
        });
    }
}

/**
 * @description Adds cells (i.e. pixels) to the 'board' div according to 
 *              the dimensions specified on the 'pixel-slider' input & 
 *              displays the board dimensions.
 */
function generateBoard() {

    const dimensions = pixelSlider.value;
    board.innerHTML = "";
    addBoardCells(dimensions);
    size.textContent = `Size: ${dimensions} x ${dimensions}`;
}

/**
 * @description     Adjusts the color-based variables to match the selected 
 *                  input.
 * @param {Event}   e The selected 'color' input
 */
function colorSelect(e) {

    if (e.target.getAttribute("id") === "pencil-color" 
        && marker === markerModes.Pencil) {
        markerColor = pencilColor.value;

    } else if (e.target.getAttribute("id") === "eraser-color" 
        && marker === markerModes.Eraser) {
        markerColor = eraserColor.value;

    } else if (e.target.getAttribute("id") === "grid-color") {
        let cells = document.querySelectorAll(`.cell`);
        cells.forEach((cell) => {
            cell.style.borderColor = `${gridColor.value}`;
        });
    }
}

/**
 * @description         Randomly generates a HEX value as a string.
 * @returns {string}    A random HEX value
 */
function generateRandomHex() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

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

/**
 * @description Clears the entire board with the `eraserColor` value.
 */
function resetBoard() {

    let cells = document.querySelectorAll(`.cell`);
    cells.forEach((cell) => {
        cell.classList.remove("marked");
        cell.style.backgroundColor = eraserColor.value;
    });
}

/**
 * @description An ENUM for the differ 'grid' modes.
 */
const gridStyles = Object.freeze({
    None: "None",
    Solid: "Solid",
    Dotted: "Dotted"
});

/**
 * @description     Changes the grid style whenever the 'grid' button 
 *                  is pressed.
 * @param {Event}   e The event triggered by the 'grid' button
 */
function changeGridStyle(e) {

    let cells = document.querySelectorAll(`.cell`);

    if (e.target.value === gridStyles.None) {
        gridStyle = gridStyles.Solid;
        grid.value = `${gridStyles.Solid}`;
        cells.forEach((cell) => {
            cell.style.border = `0.1px ${gridStyles.Solid} ${gridColor.value}`;
        });

    } else if (e.target.value === gridStyles.Solid) {
        gridStyle = gridStyles.Dotted;
        grid.value = `${gridStyles.Dotted}`;
        cells.forEach((cell) => {
            cell.style.border = `0.1px ${gridStyles.Dotted} ${gridColor.value}`;
        });

    } else {
        gridStyle = gridStyles.None;
        grid.value = `${gridStyles.None}`;
        cells.forEach((cell) => {
            cell.style.border = `0`;
        });
    }
}

/**
 * @description Plays the audio stored in the HTML tag with `id`.
 * @param       {string} id The HTML tag that contains the audio
 */
function playAudio(id) {
    const audio = document.getElementById(id);
    if (!audio) return;
    audio.play();
}

/**
 * @description Handles Day/Night functionality.
 */
function toggleDayNightMode() {

    document.body.classList.toggle("night-wallpaper");

    if (document.body.classList.contains("night-wallpaper")) {
        wallpaper.value = "Night";
        menu.style.backgroundColor = "gray";
        playAudio("night-mp3");

    } else {
        wallpaper.value = "Day";
        menu.style.backgroundColor = "beige";
        playAudio("morning-mp3");
    }
}

// STEP 1: Initialise queried document tags
const board = document.getElementById("board");
const menu = document.getElementById("menu");
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
const wallpaper = document.getElementById("wallpaper");

// STEP 2: Initialise variables & execute onload functions
let marker = markerModes.Pencil;
pencil.classList.add("marker");
let markerColor = pencilColor.value;
board.style.cursor = `url("images/pencil-cursor.gif"), auto`;
let gridStyle = gridStyles.None;
window.onload = generateBoard;

/**
 * STEP 3: Code to check if mouse is being pressed
 * @link https://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down
 */
let isMouseDown = false;
board.onmousedown = () => isMouseDown = true;
board.onmouseup = () => isMouseDown = false;

// STEP 4: Handle pencil functionality
pencil.addEventListener("click", changeMarkerMode);
pencilColor.addEventListener("input", colorSelect);
pencil.addEventListener("click", () => playAudio("pencil-mp3"));

// STEP 5: Handle eraser & reset functionality
eraser.addEventListener("click", changeMarkerMode);
eraserColor.addEventListener("input", colorSelect);
eraser.addEventListener("click", () => playAudio("eraser-mp3"));
reset.addEventListener("click", resetBoard);
reset.addEventListener("click", () => playAudio("reset-mp3"));

// STEP 6: Handle grid toggling
grid.addEventListener("click", changeGridStyle);
gridColor.addEventListener("input", colorSelect);
grid.addEventListener("click", () => playAudio("grid-mp3"));

// STEP 7: Handle Nyan Cat functionality
nyanCat.addEventListener("click", changeMarkerMode);
nyanCat.addEventListener("click", () => playAudio("nyan-mp3"));

// STEP 8: Handle pixel slider functionality
pixelSlider.addEventListener("input", generateBoard);
pixelSlider.addEventListener("input", () => playAudio("slider-mp3"));

// STEP 9: Wallpaper Toggle
wallpaper.addEventListener("click", toggleDayNightMode);
