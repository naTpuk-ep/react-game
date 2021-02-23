import { IGameState } from "./interfaces";

export default class Game  {

	// gridSize!: number;
	// undoMode!: boolean; 
	// gridState!: Grid;

	constructor(public gameState: IGameState, public setGameState: Function) {
		// Object.assign( this, gameState );
	}

	bindTriggers(): void {
	}

	init(): void {
	}

	start(): void {
		console.log('start');
	}

	setState(): void {
		this.setGameState(() => ({
				...this.gameState,
		}));
	}

	right(): void {
		console.log('right');
		// this.setState();
	}

	left(): void {
		console.log('left');
		// this.setState();
	}

	up(): void {
		console.log('up');
		// this.setState();
	}

	down(): void {
		console.log('down');
		// this.setState();
	}
	
}

