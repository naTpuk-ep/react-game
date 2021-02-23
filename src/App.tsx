import React, { useState } from "react";
import "./App.scss";
import GameContainer from "./Components/GameContainer";
import Menu from "./Components/Menu";
import { ICell, Grid, IStates, Size } from "./interfaces";

//blackMode

const App: React.FC = () => {
	// // const [blackMode, setBlackMode] = useState<boolean>(false);
	const [play, setPlay] = useState<boolean>(false);
	const sizes: Size[] = [4, 6, 8];
	const [size, setSize] = useState<Size>(sizes[0]);
  
	const getRandomCoord = (): number => Math.floor(Math.random() * (size));
  
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

  const setDifferentCell = (cell: ICell): ICell => {
    const diffCell = setCell();
    if (diffCell.x === cell.x && diffCell.y === cell.y) {
			return setDifferentCell(cell);
    }
    return diffCell;
  }
  
  const setGrid = (cell1: ICell, cell2: ICell): Grid => {
		const grid: Grid = [];
		for (let y = 0; y < size; y++) {
			grid[y] = [];
      for (let x = 0; x < size; x++) {
        const value: number | undefined =
          x === cell1.x && y === cell1.y
            ? cell1.value
            : x === cell2.x && y === cell2.y
              ? cell2.value
              : undefined
				grid[y][x] = setCell({ x, y, value });
			}
    }
    return grid;
	}
  
  const cell1 = setCell();
  const cell2 = setDifferentCell(cell1);

  console.log(cell1, cell2);
  

	const setStartState = (cell1: ICell, cell2: ICell): IStates => {
		const state: IStates = {};
		if (localStorage.getItem("gameStates")) {
			return JSON.parse(localStorage.getItem("gameStates")!);
		}
		sizes.forEach(size => {
			Object.assign(state, {
				[size]: {
					size,
					undoMode: true,
					grid: setGrid(cell1, cell2),
				},
			});
		});
		return state;
	};

  const startState: IStates = setStartState(cell1, cell2);
  
  console.log(startState);
  
	const startHandler = (): void => {
		setPlay(true);
	};

	const nextSizeHandler = (): void => {
		setSize(
			sizes.indexOf(size) + 1 >= sizes.length
				? sizes[0]
				: sizes[sizes.indexOf(size) + 1]
		);
	};

	const prevSizeHandler = (): void => {
		setSize(
			sizes.indexOf(size) === 0
				? sizes[sizes.length - 1]
				: sizes[sizes.indexOf(size) - 1]
		);
	};

	return (
		<>
			{play ? (
				<GameContainer gameState={startState[size]} />
			) : (
				<Menu
					prevSizeHandler={prevSizeHandler}
					nextSizeHandler={nextSizeHandler}
					startHandler={startHandler}
				/>
			)}
		</>
	);
};

export default App;
