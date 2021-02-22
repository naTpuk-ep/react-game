import Game from "./Game";

export type Size = 4 | 6 | 8;

export type Grid = Array<Array<number | null>>;

export interface IGameState {
		gridSize: number,
		undoMode: boolean, 
		gridState: Grid,
}

export interface IStates {
	[key: number]: IGameState
}

export interface IStartBtnProps {
	startHandler(): void
	game: Game
}

export interface IGameWrapperProps {
	gameState: IGameState
}

// export interface IGridSizeOptionProps {
// 	gridSizeHandler(): void,
// }
