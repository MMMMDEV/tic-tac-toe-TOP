const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // across
    [0, 4, 8],
    [2, 4, 6]
];

const board = document.querySelector("#board");
const cells = document.querySelectorAll("[data-cell]");
const xButton = document.querySelector("[data-X-Btn]");
const oButton = document.querySelector("[data-O-Btn]");
const winSection = document.querySelector("#winSection")
const winingText = document.querySelector("[data-win-text]");
const restartBtn = document.querySelector("#restartBtn");
let oTurn; 

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true})
    });
    turn();
    winSection.classList.remove("active");
    setBoardHoverClass();
}


function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;

    

    placeSym(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        setBoardHoverClass();
    }
};

function endGame(draw) {
    if (draw) {
        winingText.textContent = "Draw!";
    } else {
        winingText.textContent = `${oTurn ? "O" : "X"} Wins!` 
    }
    winSection.classList.add("active");
};

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(O_CLASS)
    });
};

function placeSym(cell, currentClass) {
    cell.classList.add(currentClass);
};

// turn choosing
function turn() {
    xButton.addEventListener("click", e => {
        oTurn = false;
        xButton.style.cursor = "not-allowed";
        oButton.style.cursor = "not-allowed";
        cells.forEach(cell => {
            cell.style.cursor = "pointer";
        });
        setBoardHoverClass(); },
        {once: true});
    
    oButton.addEventListener("click", e => {
        oTurn = true;
        xButton.style.cursor = "not-allowed";
        oButton.style.cursor = "not-allowed";
        cells.forEach(cell => {
            cell.style.cursor = "pointer";
        });
        setBoardHoverClass(); },
        {once: true});
} 

// end of turn choosing

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
};

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}