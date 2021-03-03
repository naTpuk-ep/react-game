import Game from "./Game";

export type Size = 4 | 6 | 8;

export type ModalType = "2048" | "gameover" | "never" | undefined;

export enum CellStates {
	IDLE = "IDLE",
	MOVING = "MOVING",
	DYING = "DYING",
	INCREASE = "INCREASE",
	NEW = "NEW",
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
	prevState: IGameState | null;
}

export type IStates = Array<IGameState>;

export interface IStartBtnProps {
	startHandler(): void;
	game: Game;
}

export interface IGameWrapperProps {
	gameState: IGameState;
	exitHandler(): void;
}

export interface IMenuProps {
	prevSizeHandler(): void;
	nextSizeHandler(): void;
	startHandler(): void;
	size: Size;
}

export interface ICellProps {
	x: number;
	y: number;
	value: number;
	size: number;
	border: number;
	state: CellStates;
}

export interface IGridProps {
	gameState: IGameState;
	setGameState: Function;
	replayHandler(): void;
	exitHandler(): void;
}

export type Key = "ArrowLeft" | "ArrowDown" | "ArrowRight" | "ArrowUp";

export interface ModalProps {
	type: ModalType;
	replayHandler(): void;
	exitHandler(): void;
	setModal: Function;
	setCanMove: Function;
}
// export interface IGridSizeOptionProps {
// 	gridSizeHandler(): void,
// }
