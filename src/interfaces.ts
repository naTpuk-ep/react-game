import Game from "./Game";

export type Size = 4 | 6 | 8;

export interface ICell {
	x: number;
	y: number;
	value: number | undefined;
	id?: number;
}

export type Matrix = Array<Array<ICell | null>>;

export interface IGameState {
	size: number;
	undoMode: boolean;
	cells: ICell[];
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

export interface ICellProps extends ICell {
	size: number;
}

// export interface IGridSizeOptionProps {
// 	gridSizeHandler(): void,
// }
