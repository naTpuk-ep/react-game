import { sizes } from "./constants";
import { ICell, IStates, Size } from "./interfaces";

export const initState = () => {
	
	if (localStorage.getItem("2048")) {
		return JSON.parse(localStorage.getItem("2048")!);
	}

	const getRandomCoord = (size: Size): number => Math.floor(Math.random() * size);
	const value = 2;

	const setCell = (x: number, y: number, value: number): ICell => {
		return {
			x,
			y,
			value,
			id: Date.now()
		};
	};

	const initCells = (size: Size): ICell[] => {
		
		const cell1: ICell = setCell(getRandomCoord(size), getRandomCoord(size), value);
		const cell2: ICell = setDifferentCell(cell1, size);
		cell2.id! += 1;

		return [cell1, cell2];
	};

	const setDifferentCell = (cell: ICell, size: Size): ICell => {
		const diffCell = setCell(getRandomCoord(size), getRandomCoord(size), value);
		if (diffCell.x === cell.x && diffCell.y === cell.y) {
			return setDifferentCell(cell, size);
		}
		return diffCell;
	};

	// const cell1 = setCell();
	// const cell2 = setDifferentCell(cell1);

	// sizes.forEach(size => {
	// 	Object.assign(state, {
	// 		[size]: {
	// 			size,
	// 			undoMode: true,
	// 			grid: setGrid(cell1, cell2, size),
	// 		},
	// 	});
	// });

	const state: IStates = sizes.map(size => {
		return {
			size,
			undoMode: true,
			cells: initCells(size),
		};
	});;

	return state;
};
