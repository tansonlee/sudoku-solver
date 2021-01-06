let sudoku;
let current = null;
let stack = [];
let board;

function preload() {
	board = loadJSON("./sudokus/sudoku.json");
}

function setup() {
	createCanvas(600, 600);
	sudoku = new Sudoku(board);
}

function draw() {
	background(255);
	sudoku.show();
	if (sudoku.isSolved()) {
		noLoop();
		sudoku.animateValidation();
	}
	for (let i = 0; i < 100; i++) {
		// solve
		if (!sudoku.isSolved()) {
			if (sudoku.isValid()) {
				if (current !== null) {
					stack.push(current);
				}
				current = giveZeroCell();
				sudoku.board[current.y][current.x]++;
			} else if (sudoku.board[current.y][current.x] < 9) {
				sudoku.board[current.y][current.x]++;
			} else {
				sudoku.board[current.y][current.x] = 0;
				current = stack.pop();
				while (sudoku.board[current.y][current.x] === 9) {
					sudoku.board[current.y][current.x] = 0;
					current = stack.pop();
					//need to change current
				}
				sudoku.board[current.y][current.x]++;
			}
		}
		// // create a red rectangle around current
		// stroke(255, 0, 0);
		// noFill();
		// rect(
		// 	current.x * sudoku.cellWidth,
		// 	current.y * sudoku.cellHeight,
		// 	sudoku.cellWidth,
		// 	sudoku.cellHeight
		// );
	}

	// 3 cases for when sudoku isnt solved
	// current state is valid : current equals next zero cell, add cell to stack, increase value by 1
	// current state is invalid and current cell has a value < 9 : increase value of cell by 1
	// current state is invalid and current cell has a value = 9 : set current cell to 0, get new current from stack, increase by 1
}

// returns object with { x, y } of a cell with 0
const giveZeroCell = () => {
	for (let y = 0; y < sudoku.board.length; y++) {
		for (let x = 0; x < sudoku.board[0].length; x++) {
			if (sudoku.board[y][x] === 0) {
				return { x, y };
			}
		}
	}

	return null;
};
