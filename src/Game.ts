import { Key } from "react";
import { setDifferentCell } from "./initState";
import { IGameState, ICell, Matrix, CellStates } from "./interfaces";
import { saveGame } from "./saveGame";

export default class Game {
	prevCells: ICell[];
	constructor(public state: IGameState, public setCells: Function) {
		this.prevCells = JSON.parse(localStorage.getItem("2048")!).find(
			(game: IGameState) => game.size === this.state.size
		).cells;
		this.prevCells.forEach(cell => {
			return (cell.state = CellStates.IDLE);
		});
	}

	finish() {
		const { cells } = this.state;
		const matrix = this.createMatrixFromCells(cells);
		const canMove = () => {
			if (cells.length === this.state.size ** 2) {
				for (let y = 0; y < matrix.length; y++) {
					for (let x = 0; x < matrix.length; x++) {
						let prevX = x - 1;
						let nextX = x + 1;
						let nextY = y + 1;
						let prevY = y - 1;
						let value = matrix[y][x]?.value;
						let checkValues: any[] = [];
						for (let Yindex of [prevY, nextY]) {
							for (let Xindex of [prevX, nextX]) {
								if (
									Xindex >= 0 &&
									Xindex < matrix.length &&
									Yindex >= 0 &&
									Yindex < matrix.length
								) {
									checkValues.push(matrix[y][Xindex]?.value);
									checkValues.push(matrix[Yindex][x]?.value);
								}
							}
						}
						for (let checkValue of checkValues) {
							if (value === checkValue) {
								return true;
							}
						}
					}
				}
				return false;
			}
			return true;
		};
		return !canMove();
	}

	populateField(): ICell[] {
		const cells = [...this.state.cells];

		if (JSON.stringify(cells) === JSON.stringify(this.prevCells)) {
			return cells;
		}
		const newCells = [...cells, setDifferentCell(cells, this.state.size)];
		this.state.cells = newCells;
		return newCells;
	}

	removeAndIncreaseCells(): ICell[] {
		const newCells = [...this.state.cells]
			.filter(cell => cell.state !== CellStates.DYING)
			.map(cell => {
				if (cell.state === CellStates.INCREASE) {
					cell.value *= 2;
					this.state.score += cell.value;
					if (this.state.highScore < this.state.score) {
						this.state.highScore = this.state.score;
					}
				}
				cell.state = CellStates.IDLE;
				return cell;
			});
		this.state.cells = newCells;
		return newCells;
	}

	moveCells(key: Key): ICell[] {
		const cells: ICell[] = [...this.state.cells];

		if (
			key !== "ArrowLeft" &&
			key !== "ArrowDown" &&
			key !== "ArrowRight" &&
			key !== "ArrowUp"
		)
			return cells;
		const matrix = this.createMatrixFromCells(cells);
		this.rotateMatrixFromDirection(matrix, key);
		for (let y = 0; y < this.state.size; y++) {
			for (let x = 0; x < this.state.size; x++) {
				if (matrix[y][x]) {
					this.moveCell(matrix, x, y);
				}
			}
		}
		this.rotateMatrixToDirection(matrix, key);
		for (let y = 0; y < this.state.size; y++) {
			for (let x = 0; x < this.state.size; x++) {
				if (matrix[y][x]) {
					matrix[y][x]!.y = y;
					matrix[y][x]!.x = x;
				}
			}
		}
		cells
			.filter(cell => cell.by)
			.forEach(cell => {
				cell.x = cell.by!.x!;
				cell.y = cell.by!.y!;
				delete cell.by;
			});

		return cells;
	}

	private moveCell(matrix: Matrix, x: number, y: number): void {
		let nextRow = y - 1;
		let currRow = y;
		while (nextRow >= 0) {
			if (matrix[nextRow][x] === null) {
				matrix[nextRow][x] = matrix[currRow][x];
				matrix[currRow][x]!.state = CellStates.MOVING;
				matrix[currRow][x] = null;
				currRow = nextRow;
			} else if (
				matrix[nextRow][x]!.value === matrix[currRow][x]!.value &&
				(matrix[nextRow][x]!.state === CellStates.IDLE ||
					matrix[nextRow][x]!.state === CellStates.MOVING)
			) {
				matrix[nextRow][x]!.state = CellStates.DYING;
				matrix[nextRow][x]!.by = matrix[currRow][x]!;
				matrix[currRow][x]!.state = CellStates.INCREASE;
				matrix[nextRow][x] = matrix[currRow][x];
				matrix[currRow][x] = null;
				currRow = nextRow;
			} else break;
			nextRow -= 1;
		}
	}

	private _rotateMatrix(matrix: any[][]) {
		matrix = matrix.reverse();
		for (var i = 0; i < matrix.length; i++) {
			for (var j = 0; j < i; j++) {
				var temp = matrix[i][j];
				matrix[i][j] = matrix[j][i];
				matrix[j][i] = temp;
			}
		}
	}

	private rotateMatrixFromDirection(matrix: any[][], key: Key) {
		switch (key) {
			case "ArrowLeft":
				this._rotateMatrix(matrix);
				break;
			case "ArrowDown":
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				break;
			case "ArrowRight":
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				break;
			default:
				break;
		}
	}

	private rotateMatrixToDirection(matrix: any[][], key: Key) {
		switch (key) {
			case "ArrowRight":
				this._rotateMatrix(matrix);
				break;
			case "ArrowDown":
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				break;
			case "ArrowLeft":
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				break;
			default:
				break;
		}
	}

	private createMatrixFromCells(cells: ICell[]): Matrix {
		const matrix: Matrix = Array.from(new Array(this.state.size), () =>
			Array.from(new Array(this.state.size), () => null)
		);
		cells.forEach(cell => {
			matrix[cell.y][cell.x] = cell;
		});
		return matrix;
	}
}

