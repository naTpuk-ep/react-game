import React, { Key, useEffect, useMemo, useRef, useState } from "react";
import Game from "../Game";
import { IGameState, IGridProps } from "../interfaces";
import { saveGame } from "../saveGame";
import Cell from "./Cell";

const Grid: React.FC<IGridProps> = props => {
	const { gameState, setGameState } = props;
	const [cells, setCells] = useState(gameState.cells);
	const canMove = useRef(true);
	const { size } = gameState;
	const game = useMemo(() => new Game(gameState, setCells), [gameState]);

	const delay = async (ms: number) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	};

	useEffect(() => {
		setCells(gameState.cells);
	}, [gameState]);

	useEffect(() => {
		const handler = async (event: KeyboardEvent) => {
			if (canMove.current) {
				canMove.current = false;
				setCells(game.moveCells(event.key));
				await delay(100);
				setCells(game.removeAndIncreaseCells());
				setCells(game.populateField());
				saveGame(game.state);
				setGameState((state: IGameState) => ({
					...state,
					...game.state,
				}));
				game.finish();
				await delay(100);
				canMove.current = true;
			}
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [game, setGameState]);

	const cellSize: number = 100;
	const border: number = 5;
	return (
		<div
			className="game"
			style={{
				width: `${cellSize * size + (size + 1) * border * 2}px`,
				height: `${cellSize * size + (size + 1) * border * 2}px`,
			}}
		>
			<div className="game__background">
				{Array.from(new Array(size ** 2), (_, i) => i).map((_, i) => {
					return (
						<div
							style={{
								height: `${cellSize}px`,
								width: `${cellSize}px`,
							}}
							className="game__cell"
							key={i}
						></div>
					);
				})}
			</div>
			<div className="game__background playground">
				{cells.map(cell => (
					<Cell
						x={cell.x}
						y={cell.y}
						value={cell.value}
						key={cell.id}
						size={cellSize}
						border={border}
						state={cell.state}
					/>
				))}
			</div>
		</div>
	);
};

export default Grid;

	// const useKey = async (key: string, callBack: Function) => {
	// 	useEffect(() => {
	// 		const handler = async (event: KeyboardEvent) => {
	// 			if (event.key === key) {
	// 				console.log(game.gameState);
	// 				await callBack(event);
	// 				setGameState(game.gameState);
	// 			}
	// 		};
	// 		document.addEventListener("keydown", handler);
	// 		return () => document.removeEventListener("keydown", handler);
	// 	}, [callBack, key]);
	// };

	// useKey("ArrowLeft", game.left);
	// useKey("ArrowRight", game.right);
	// useKey("ArrowUp", game.up);
	// useKey("ArrowDown", game.down);
