import { sizes } from "./constants";
import { Grid, ICell, IStates, Size } from "./interfaces";

export const initState = (size: Size) => {
	const state: IStates = {};
	if (localStorage.getItem("2048")) {
		return JSON.parse(localStorage.getItem("2048")!);
	}

	const getRandomCoord = (): number => Math.floor(Math.random() * size);

	const setCell = (cell?: ICell): ICell => {
		return {
			...(cell ?? {
				x: getRandomCoord(),
				y: getRandomCoord(),
				value: 2,
			}),
			get id() {
				return size * this.y + this.x + 1;
			},
		};
	};

	const setGrid = (cell1: ICell, cell2: ICell, size: Size): Grid => {
		const grid: Grid = [];
		for (let y = 0; y < size; y++) {
			grid[y] = [];
			for (let x = 0; x < size; x++) {
				const value: number | undefined =
					x === cell1.x && y === cell1.y
						? cell1.value
						: x === cell2.x && y === cell2.y
						? cell2.value
						: undefined;
				grid[y][x] = setCell({ x, y, value });
			}
		}
		return grid;
	};

	const setDifferentCell = (cell: ICell): ICell => {
		const diffCell = setCell();
		if (diffCell.x === cell.x && diffCell.y === cell.y) {
			return setDifferentCell(cell);
		}
		return diffCell;
	};

	const cell1 = setCell();
	const cell2 = setDifferentCell(cell1);

	sizes.forEach(size => {
		Object.assign(state, {
			[size]: {
				size,
				undoMode: true,
				grid: setGrid(cell1, cell2, size),
			},
		});
	});

	return state;
};
