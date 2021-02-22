import { IGameState } from "./interfaces";

export default class Game  {

	// gridSize!: number;
	// undoMode!: boolean; 
	// gridState!: Grid;

	constructor( public gameState: IGameState, public setGameState: Function ) {
		// Object.assign( this, gameState );
	}

	// init(): IGameState {		
	// 	// this.gridState[2][2] = 1;
	// 	// this.setGameState(this.gridState);
	// 	return this.gameState
	// }

	start(): void {
		console.log('start');
	}

	setState() {
		this.setGameState(() => {
			return {
				...this.gameState,
			}
		});
	}

	right(): void {
    console.log('down');
		this.gameState.gridState[2][2] = 1;
		this.setState();
	}
}

