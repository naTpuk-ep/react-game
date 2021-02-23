import Game from "./Game";

export type Size = 4 | 6 | 8;

export interface ICell {
	x: number;
	y: number;
	value: number | undefined;
	id?: number;
}

export type Grid = Array<Array<ICell>>;

export interface IGameState {
	size: number;
	undoMode: boolean;
	grid: Grid;
}

export interface IStates {
	[key: number]: IGameState;
}

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
	key: number | undefined;
}

// export interface IGridSizeOptionProps {
// 	gridSizeHandler(): void,
// }
