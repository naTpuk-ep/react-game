import { IGameState, ICell, Matrix } from "./interfaces";

export default class Game {
	// gridSize!: number;
	// undoMode!: boolean;
	// gridState!: Grid;

	constructor(public gameState: IGameState, public setGameState: Function) {
		// Object.assign( this, gameState );
		this.right = this.right.bind(this);
		this.left = this.left.bind(this);
		this.up = this.up.bind(this);
		this.down = this.down.bind(this);
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

	moveCells(initCells: ICell[], direction: string) {
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

		return cells;
	}

	moveCell(matrix: Matrix, x: number, y: number): void {
		let nextRow = y - 1;
		let currRow = y;

		while (nextRow >= 0) {
			if (matrix[nextRow][x] === null) {
				matrix[nextRow][x] = matrix[currRow][x];
				matrix[currRow][x] = null;
				currRow = nextRow;
			}
			nextRow -= 1;
		}
	}

	bindTriggers(): void {}

	init(): void {}

	start(): void {
		console.log("start");
	}

	setState(): void {
		this.setGameState((prev: any) => ({
			...prev,
			...this.gameState,
		}));
	}

	up(): void {
		console.log("up");
		this.moveCells(this.gameState.cells, "UP");
		this.setState();
	}

	right(): void {
		console.log("right");
		this.moveCells(this.gameState.cells, "RIGHT");
		this.setState();
	}

	left(): void {
		console.log("left");
		this.moveCells(this.gameState.cells, "LEFT");
		this.setState();
	}

	down(): void {
		console.log("down");
		this.moveCells(this.gameState.cells, "DOWN");
		this.setState();
	}
}

