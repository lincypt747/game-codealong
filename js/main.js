/*------ Lookup Data / Constants -------*/
const WINNING_COMBOS = [
    [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
    ],
    [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
    ],
    [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
    ],
    [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
    ],
    [
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 2, col: 1 },
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 2 },
    ],
    [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
    ],
];
/*------Cached Eleements -------*/
const messageEl = document.querySelector('h3.message-header');
const boardEl = document.querySelector('div.board');

boardEl.addEventListener('click', handleBoardClick);

/*------ State -------*/
let board, turn, winner;

/*------ Logic -------*/
init();

function init() {
    board = [
        [null, null, null],
        [null,null, null],
        [null, null, null],
    ];

    turn = 'X';
    winner = null;

    render();
}

function render() {
    renderMessage();
    renderBoard();
    renderNewGameBtn();
}

function renderNewGameBtn() {
    if (winner) {
        const newGameBtn = document.createElement('button')
        newGameBtn.innerText = 'New Game'
        newGameBtn.addEventListener('click', init)
        document.body.append(newGameBtn)
    } else {
        const newGameBtn = document.querySelector('button')
        if (newGameBtn) {
            newGameBtn.remove();
        }
    }
}

function renderMessage() {
    if (winner == 'T'){
        messageEl.innerText = `it is a tie game!`;
    } else if(!winner){
        messageEl.innerText = `it is ${turn}'s turn`;
    } else {
        messageEl.innerText = `Player ${winner} won!`;
    }
}

function renderBoard() {
board.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
        document.getElementById(`r${rowIdx}c${colIdx}`).innerText = col
            ? col
            : '';
        });
    });
}

function changeTurn(){
    if (turn === 'X') {
        turn = 'O';
        } else {
        turn = 'X';
        }
}

function handleBoardClick(evt) {
if (evt.target.classList.contains('cell') && !winner){
        const row = evt.target.id[1];
        const col = evt.target.id[3];
        if (!board[row][col]) {
            board[row][col] = turn;
            checkWinner();
            changeTurn();
        }
        render();     
}
}

function checkWinner() {
    WINNING_COMBOS.forEach((combo) => {
        const pos1 = combo[0];
        const pos2 = combo[1];
        const pos3 = combo[2];

        if (
        board[pos1.row][pos1.col] === board[pos2.row][pos2.col] &&
        board[pos1.row][pos1.col] === board[pos3.row][pos3.col]
        ) {
        if (board[pos1.row][pos1.col]) {
            winner = turn;
        }
        }
    });

    const isEmpty = board.some((row) => row.includes(null));

    if (!winner && !isEmpty) {
        winner = 'T';
    }
} 