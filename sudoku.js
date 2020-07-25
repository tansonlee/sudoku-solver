class Sudoku {
	constructor(board) {
		this.board = board.board;

		// // finished board
		// this.board = [
		// 	[5, 3, 4, 6, 7, 8, 9, 1, 2],
		// 	[6, 7, 2, 1, 9, 5, 3, 4, 8],
		// 	[1, 9, 8, 3, 4, 2, 5, 6, 7],
		// 	[8, 5, 9, 7, 6, 1, 4, 2, 3],
		// 	[4, 2, 6, 8, 5, 3, 7, 9, 1],
		// 	[7, 1, 3, 9, 2, 4, 8, 5, 6],
		// 	[9, 6, 1, 5, 3, 7, 2, 8, 4],
		// 	[3, 4, 5, 2, 8, 6, 1, 7, 9],
		// ];

		this.started = [];

		for (let y = 0; y < this.board.length; y++) {
			for (let x = 0; x < this.board[0].length; x++) {
				if (this.board[y][x] !== 0) {
					this.started.push([x, y]);
				}
			}
		}

		this.cellWidth = floor(width / this.board[0].length);
		this.cellHeight = floor(height / this.board.length);
	}

	show() {
		strokeWeight(1);
		textAlign(CENTER, CENTER);
		textSize(32);
		stroke(0);
		for (let y = 0; y < this.board.length; y++) {
			for (let x = 0; x < this.board[y].length; x++) {
				noFill();
				rect(
					x * this.cellWidth,
					y * this.cellHeight,
					this.cellWidth,
					this.cellHeight
				);

				let value = this.board[y][x];

				fill(80);
				this.started.forEach(a => {
					if (a[0] === x && a[1] === y) {
						fill(0);
					}
				});

				if (value !== 0) {
					text(
						value,
						x * this.cellWidth + 0.5 * this.cellWidth,
						y * this.cellHeight + 0.5 * this.cellHeight
					);
				}
			}
		}
		strokeWeight(6);
		line(this.cellWidth * 3, 0, this.cellWidth * 3, height);
		line(this.cellWidth * 6, 0, this.cellWidth * 6, height);
		line(0, this.cellHeight * 3, height, this.cellHeight * 3);
		line(0, this.cellHeight * 6, width, this.cellHeight * 6);
	}

	// returns true or false if board is valid
	isValid() {
		// duplicates in rows
		// goes through each row for duplicate
		for (let row of this.board) {
			if (hasDuplicate(row)) {
				return false;
			}
		}

		// duplicates in columns
		// goes through each index of a row, creates an array checks for duplicates
		for (let i = 0; i < this.board[0].length; i++) {
			let arr = [];
			for (let row of this.board) {
				arr.push(row[i]);
			}

			if (hasDuplicate(arr)) {
				return false;
			}
		}

		// duplicates in 3x3 cells
		// has the 9 centres iterates through and creates an array of surrounding cells
		let centres = [
			[1, 1],
			[1, 4],
			[1, 7],
			[4, 1],
			[4, 4],
			[4, 7],
			[7, 1],
			[7, 4],
			[7, 7],
		];

		for (let centre of centres) {
			let arr = [];
			arr.push(this.board[centre[0]][centre[1]]); // MM
			arr.push(this.board[centre[0] - 1][centre[1] - 1]); // TL
			arr.push(this.board[centre[0] - 1][centre[1]]); // TM
			arr.push(this.board[centre[0] - 1][centre[1] + 1]); // TR
			arr.push(this.board[centre[0]][centre[1] + 1]); // RM
			arr.push(this.board[centre[0] + 1][centre[1] + 1]); // RB
			arr.push(this.board[centre[0] + 1][centre[1]]); // BM
			arr.push(this.board[centre[0] + 1][centre[1] - 1]); //BL
			arr.push(this.board[centre[0]][centre[1] - 1]); // LM

			if (hasDuplicate(arr)) {
				return false;
			}
		}

		// if none of the checks above returns
		return true;
	}

	// return true or false if board is solved
	isSolved() {
		for (let row of this.board) {
			for (let value of row) {
				if (value === 0) {
					return false;
				}
			}
		}

		if (!this.isValid()) {
			return false;
		}

		return true;
	}

	async animateValidation() {
		for (let y = 0; y < this.board.length; y++) {
			for (let x = 0; x < this.board[0].length; x++) {
				await sleep(20);
				const value = this.board[y][x];
				noStroke();

				fill(0, 255, 0, 100);
				rect(
					x * this.cellWidth,
					y * this.cellHeight,
					this.cellWidth,
					this.cellHeight
				);
			}
		}

		await sleep(1000);

		this.show();
	}
}

// helper function to determine if an array has duplicates
const hasDuplicate = arr => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] != 0) {
			if (arr.includes(arr[i], i + 1)) {
				return true;
			}
		}
	}

	return false;
};

const sleep = milliseconds => {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
};
