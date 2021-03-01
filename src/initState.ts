import { sizes } from "./constants";
import { CellStates, ICell, IStates, Size } from "./interfaces";

export const setDifferentCell = (cells: ICell[], size: Size): ICell => {
	const diffCell = setCell(getRandomCoord(size), getRandomCoord(size));
	if (cells.some(cell => diffCell.x === cell.x && diffCell.y === cell.y)) {
		return setDifferentCell(cells, size);
	}
	return diffCell;
};

const getValue = () => 2;

export const getRandomCoord = (size: Size): number => Math.floor(Math.random() * size);

export const setCell = (x: number, y: number): ICell => {
	return {
		x,
		y,
		value: getValue(),
		id: Date.now(),
		state: CellStates.IDLE,
	};
};

export const initState = () => {
	if (localStorage.getItem("2048")) {
		console.log("init from local", JSON.parse(localStorage.getItem("2048")!));
		return JSON.parse(localStorage.getItem("2048")!);		
	}

	const initCells = (size: Size): ICell[] => {
		const cell1: ICell = setCell(getRandomCoord(size), getRandomCoord(size));
		const cell2: ICell = setDifferentCell([cell1], size);
		cell2.id! += 1;

		return [cell1, cell2];
	};

	const state: IStates = sizes.map(size => {
		return {
			size,
			undoMode: true,
			cells: initCells(size),
			score: 0,
			highScore: 0,
		};
	});

	localStorage.setItem("2048", JSON.stringify(state));

	return state;
};
