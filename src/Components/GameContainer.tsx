import React, { useCallback, useEffect, useMemo, useState } from "react";
import Game from "../Game";
import { initCells } from "../initState";
import { IGameState, IGameWrapperProps } from "../interfaces";
import { saveGame } from "../saveGame";
import Cell from "./Cell";

const GameContainer: React.FC<IGameWrapperProps> = props => {
	const [gameState, setGameState] = useState<IGameState>(props.gameState);

	const { size, cells, score, highScore } = gameState;
	const game = new Game(gameState, setGameState);

	saveGame(gameState);

	const useKey = (key: string, callBack: Function): void => {
		// const callBackRef: Function = useCallback<Function>(callBack, [callBack]);
		// useEffect(() => {
		// 	callBackRef.current = callBack;
		// 	console.log("use1");
		// });
		useEffect(() => {
			const handler = (event: KeyboardEvent): void => {
				if (event.key === key) {
					callBack(event);
				}
			};
			document.addEventListener("keydown", handler);
			return () => document.removeEventListener("keydown", handler);
		}, [callBack, key]);
	};

	useKey("ArrowLeft", game.left);
	useKey("ArrowRight", game.right);
	useKey("ArrowUp", game.up);
	useKey("ArrowDown", game.down);

	const replayHandler = () => {
		setGameState(state => ({
			...state,
			score: 0,
			cells: initCells(state.size),
		}));
	};

	const cellSize: number = 100;
	const border: number = 5;
	return (
		<div className="game-wrapper">
			<div className="score-wrapper">
				<div className="score">{score}</div>
				<div className="high-score">{highScore}</div>
			</div>
			<nav className="additions">
				<button onClick={props.exitHandler} className="back">
					<i className="material-icons">exit_to_app</i>
				</button>
				<button onClick={replayHandler} className="replay">
					<i className="material-icons">replay</i>
				</button>
			</nav>
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
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default GameContainer;
