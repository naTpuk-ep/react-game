import { getRandomCoord, setCell, setDifferentCell } from "./initState";
import { IGameState, ICell, Matrix, CellStates } from "./interfaces";

export default class Game {
	constructor(public gameState: IGameState, public setGameState: Function) {
		// Object.assign( this, gameState );
		this.right = this.right.bind(this);
		this.left = this.left.bind(this);
		this.up = this.up.bind(this);
		this.down = this.down.bind(this);
	}

	populateField(cells: ICell[]): ICell[] {
		return [...cells, setDifferentCell(cells, this.gameState.size)];
		// const occupiedCoords = new Set();
		// cells.forEach(cell => {
		// 	occupiedCoords.add(cell.x * this.gameState.size + cell.y)
		// })
		// if (occupiedCoords.size === 16) return;
		// let x, y, startSize = occupiedCoords.size;
		// do {
		// 	x = getRandomCoord(this.gameState.size);
		// 	y = getRandomCoord(this.gameState.size);
		// 	const coord = x * this.gameState.size + y;
		// 	occupiedCoords.add(coord);
		// } while (startSize === occupiedCoords.size);
		// return [...cells, setCell(x, y)]
	}

	removeAndIncreaseCells(cells: ICell[]): ICell[] {
		return cells
			.filter(cell => cell.state !== CellStates.DYING)
			.map(cell => {
				if (cell.state === CellStates.INCREASE) {
					cell.value *= 2;
				}
				cell.state = CellStates.IDLE;
				return cell;
			});
	}

	_rotateMatrix(matrix: any[][]) {
		matrix = matrix.reverse();
		for (var i = 0; i < matrix.length; i++) {
			for (var j = 0; j < i; j++) {
				var temp = matrix[i][j];
				matrix[i][j] = matrix[j][i];
				matrix[j][i] = temp;
			}
		}
	}

	rotateMatrixFromDirection(matrix: any[][], direction: string) {
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

	rotateMatrixToDirection(matrix: any[][], direction: string) {
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

	moveCells(initCells: ICell[], direction: string): ICell[] {
		const cells: ICell[] = [...initCells];

		const matrix: Matrix = Array.from(new Array(this.gameState.size), () =>
			Array.from(new Array(this.gameState.size), () => null)
		);

		cells.forEach(cell => {
			matrix[cell.y][cell.x] = cell;
		});

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

	moveCell(matrix: Matrix, x: number, y: number): void {
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

	bindTriggers(): void {}

	init(): void {}

	start(): void {
		console.log("start");
	}

	async delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async setState(direction: string) {
		this.setGameState((state: IGameState) => ({
			...state,
			cells: this.moveCells(state.cells, direction),
		}));
		await this.delay(100);
		this.setGameState((state: IGameState) => ({
			...state,
			cells: this.removeAndIncreaseCells(state.cells),
		}));
		this.setGameState((state: IGameState) => ({
			...state,
			cells: this.populateField(state.cells),
		}));
	}

	up(): void {
		console.log("up");
		// this.moveCells(this.gameState.cells, "UP");
		this.setState("UP");
	}

	right(): void {
		console.log("right");
		// this.moveCells(this.gameState.cells, "RIGHT");
		this.setState("RIGHT");
	}

	left(): void {
		console.log("left");
		// this.moveCells(this.gameState.cells, "LEFT");
		this.setState("LEFT");
	}

	down(): void {
		console.log("down");
		// this.moveCells(this.gameState.cells, "DOWN");
		this.setState("DOWN");
	}
}

