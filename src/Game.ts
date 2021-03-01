import { setDifferentCell } from "./initState";
import { IGameState, ICell, Matrix, CellStates } from "./interfaces";
import { saveGame } from "./saveGame";

export default class Game {
	prevCells: ICell[];
	constructor(
		public gameState: IGameState,
		public setGameState: Function,
		public setCanMove: Function
	) {
		this.prevCells = JSON.parse(localStorage.getItem("2048")!).find(
			(game: IGameState) => game.size === this.gameState.size
		).cells;
		this.right = this.right.bind(this);
		this.left = this.left.bind(this);
		this.up = this.up.bind(this);
		this.down = this.down.bind(this);
	}

	private finishGame() {
		const { cells } = this.gameState;
		const matrix = this.createMatrixFromCells(cells);
		const canMove = () => {
			if (cells.length === this.gameState.size ** 2) {
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
		}
		if (!canMove()) {
			console.log('finish');
		}

	}

	private populateField(cells: ICell[]): ICell[] {
		if (JSON.stringify(cells) === JSON.stringify(this.prevCells)) {
			return cells;
		}
		const newCells = [...cells, setDifferentCell(cells, this.gameState.size)];
		this.gameState.cells = newCells;
		return newCells;
	}

	private removeAndIncreaseCells(cells: ICell[]): ICell[] {
		const newCells = cells
			.filter(cell => cell.state !== CellStates.DYING)
			.map(cell => {
				if (cell.state === CellStates.INCREASE) {
					cell.value *= 2;
					this.gameState.score += cell.value;
					if (this.gameState.highScore < this.gameState.score) {
						this.gameState.highScore = this.gameState.score;
					}
				}
				cell.state = CellStates.IDLE;
				return cell;
			});
		this.gameState.cells = newCells;
		return newCells;
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

	private rotateMatrixFromDirection(matrix: any[][], direction: string) {
		switch (direction) {
			case "LEFT":
				this._rotateMatrix(matrix);
				break;
			case "DOWN":
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				break;
			case "RIGHT":
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				break;
			default:
				break;
		}
	}

	private rotateMatrixToDirection(matrix: any[][], direction: string) {
		switch (direction) {
			case "RIGHT":
				this._rotateMatrix(matrix);
				break;
			case "DOWN":
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				break;
			case "LEFT":
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				this._rotateMatrix(matrix);
				break;
			default:
				break;
		}
	}

	private createMatrixFromCells(cells: ICell[]): Matrix {
		const matrix: Matrix = Array.from(new Array(this.gameState.size), () =>
			Array.from(new Array(this.gameState.size), () => null)
		);
		cells.forEach(cell => {
			matrix[cell.y][cell.x] = cell;
		});
		return matrix;
	}

	private moveCells(initCells: ICell[], direction: string): ICell[] {
		const cells: ICell[] = [...initCells];

		const matrix = this.createMatrixFromCells(cells);

		this.rotateMatrixFromDirection(matrix, direction);

		for (let y = 0; y < this.gameState.size; y++) {
			for (let x = 0; x < this.gameState.size; x++) {
				if (matrix[y][x]) {
					this.moveCell(matrix, x, y);
				}
			}
		}

		this.rotateMatrixToDirection(matrix, direction);

		for (let y = 0; y < this.gameState.size; y++) {
			for (let x = 0; x < this.gameState.size; x++) {
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

	async delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async setState(direction: string) {
		this.setCanMove(false);

		this.setGameState((state: IGameState) => {
			return {
				...this.gameState,
				cells: this.moveCells(state.cells, direction),
			};
		});

		await this.delay(100);

		this.setCanMove(true);

		this.setGameState((state: IGameState) => {
			return {
				...this.gameState,
				cells: this.removeAndIncreaseCells(state.cells),
			};
		});
		this.setGameState((state: IGameState) => {
			const newState = {
				...this.gameState,
				cells: this.populateField(state.cells),
			};
			saveGame(newState);
			return newState;
		});
		this.finishGame();
	}

	up(): void {
		this.setState("UP");
	}

	right(): void {
		this.setState("RIGHT");
	}

	left(): void {
		this.setState("LEFT");
	}

	down(): void {
		this.setState("DOWN");
	}
}

