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
        cell.style.cursor = "not-allowed";
        xButton.style.cursor = "pointer";
        oButton.style.cursor = "pointer";
    });
    winSection.classList.remove("active");
    setBoardHoverClass();
    turn();
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

    AI(currentClass);
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

function AI(currentClass) {
    switch (currentClass) {
        case O_CLASS:
            let openOSpots = [];
            for (let i = 0; i <= cells.length - 1; i++) {
                if (cells[i].classList.contains("x") === false && cells[i].classList.contains("o") === false) {
                    openOSpots.push(i);
                };
            };
            let xSpot = Math.floor(Math.random() * openOSpots.length);
            let xPosition = openOSpots[xSpot];
            cells[xPosition].classList.add(X_CLASS);
            cells[xPosition].removeEventListener("click", handleClick);
            cells[xPosition].style.cursor = "not-allowed";
            if (checkWin(O_CLASS)) {
                oTurn = true;
                endGame(false);
            } else if (checkWin(X_CLASS)) {
                oTurn = false;
                endGame(false);
            } else if (isDraw()) {
                endGame(true);
            } else {
                setBoardHoverClass();
            }
            break;
        case X_CLASS:
            let openXSpots = [];
            XOnBoard = false;
            cells.forEach(cell => {
                if (cell.classList.contains("x")) {
                    XOnBoard = true;
                }
                
            });
            if (XOnBoard === true) {
                for (let i = 0; i <= cells.length - 1; i++) {
                    if (cells[i].classList.contains("x") === false && cells[i].classList.contains("o") === false) {
                        openXSpots.push(i);
                    };
                };
                let oSpot = Math.floor(Math.random() * openXSpots.length);
                let oPosition = openXSpots[oSpot];
                cells[oPosition].classList.add(O_CLASS);
                cells[oPosition].removeEventListener("click", handleClick);
                cells[oPosition].style.cursor = "not-allowed";
                };
                if (checkWin(O_CLASS)) {
                    oTurn = true;
                    endGame(false);
                } else if (isDraw()) {
                    endGame(true);
                } else {
                    setBoardHoverClass();
                };
            break;
    }
}

// turn choosing
function turn() {

    function xTurn() {
        oTurn = false;
        const currentClass = oTurn ? O_CLASS : X_CLASS;
        AI(currentClass);
        xButton.style.cursor = "not-allowed";
        oButton.style.cursor = "not-allowed";
        cells.forEach(cell => {
            cell.style.cursor = "pointer";
            cell.addEventListener("click", handleClick, { once: true})
        });
        setBoardHoverClass();
        oButton.removeEventListener("click", OTurn);};
        
    function OTurn() {
        oTurn = true;
        const currentClass = oTurn ? O_CLASS : X_CLASS;
        AI(currentClass);
        xButton.style.cursor = "not-allowed";
        oButton.style.cursor = "not-allowed";
        cells.forEach(cell => {
            cell.style.cursor = "pointer";
            cell.addEventListener("click", handleClick, { once: true});
            if(cell.classList.contains("x") === true) {
                cell.removeEventListener("click", handleClick);
                cell.style.cursor = "not-allowed";
            };
        });
        setBoardHoverClass();
        xButton.removeEventListener("click", xTurn);
        };

    xButton.addEventListener("click", xTurn, {once : true});
    
    oButton.addEventListener("click", OTurn, {once : true});

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