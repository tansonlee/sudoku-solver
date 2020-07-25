class Sudoku {
	constructor() {
		this.board = [
			[5, 3, 0, 0, 7, 0, 0, 0, 0],
			[6, 0, 0, 1, 9, 5, 0, 0, 0],
			[0, 9, 8, 0, 0, 0, 0, 6, 0],
			[8, 0, 0, 0, 6, 0, 0, 0, 3],
			[4, 0, 0, 8, 0, 3, 0, 0, 1],
			[7, 0, 0, 0, 2, 0, 0, 0, 6],
			[0, 6, 0, 0, 0, 0, 2, 8, 0],
			[0, 0, 0, 4, 1, 9, 0, 0, 5],
			[0, 0, 0, 0, 8, 0, 0, 7, 9],
		];

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

		this.cellWidth = floor(width / this.board[0].length);
		this.cellHeight = floor(height / this.board.length);
	}

	show() {
		for (let y = 0; y < this.board.length; y++) {
			for (let x = 0; x < this.board[y].length; x++) {
				fill(200);
				rect(
					x * this.cellWidth,
					y * this.cellHeight,
					this.cellWidth,
					this.cellHeight
				);

				let value = this.board[y][x];

				fill(0);
				textAlign(CENTER, CENTER);
				textSize(32);
				if (value !== 0) {
					text(
						value,
						x * this.cellWidth + 0.5 * this.cellWidth,
						y * this.cellHeight + 0.5 * this.cellHeight
					);
				}
			}
		}
	}

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
			arr.push(this.board[(centre[0], centre[1])]); // MM
			arr.push(this.board[(centre[0] - 1, centre[1] - 1)]); // TL
			arr.push(this.board[(centre[0] - 1, centre[1])]); // TM
			arr.push(this.board[(centre[0] - 1, centre[1] + 1)]); // TR
			arr.push(this.board[(centre[0], centre[1] + 1)]); // RM
			arr.push(this.board[(centre[0] + 1, centre[1] + 1)]); // RB
			arr.push(this.board[(centre[0] + 1, centre[1])]); // BM
			arr.push(this.board[(centre[0] - 1, centre[1] + 1)]); //BL
			arr.push(this.board[(centre[0], centre[1] - 1)]); // LM
		}

		return true;
	}

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
}

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
