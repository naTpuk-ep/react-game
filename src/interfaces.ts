import Game from "./Game";

export type Size = 4 | 6 | 8;

export enum CellStates {
	IDLE = "IDLE",
	MOVING = "MOVING",
	DYING = "DYING",
	INCREASE = "INCREASE",
}

export interface ICell {
	x: number;
	y: number;
	value: number;
	id: number;
	state: CellStates;
	by?: ICell;
}

export type Matrix = Array<Array<ICell | null>>;

export interface IGameState {
	size: Size;
	undoMode: boolean;
	cells: ICell[];
	score: number;
	highScore: number;
}

export type IStates = Array<IGameState>;

export interface IStartBtnProps {
	startHandler(): void;
	game: Game;
}

export interface IGameWrapperProps {
	gameState: IGameState;
}

export interface IMenuProps {
	prevSizeHandler(): void;
	nextSizeHandler(): void;
	startHandler(): void;
}

export interface ICellProps {
	x: number;
	y: number;
	value: number | undefined;
	size: number;
}

// export interface IGridSizeOptionProps {
// 	gridSizeHandler(): void,
// }
