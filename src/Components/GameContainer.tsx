import React, { useCallback, useEffect, useRef, useState } from "react";
import Game from "../Game";
import { IGameState, IGameWrapperProps } from "../interfaces";
import Cell from "./Cell";

const GameContainer: React.FC<IGameWrapperProps> = props => {
	const { size, undoMode, grid } = props.gameState;
	const [gameState, setGameState] = useState<IGameState>(props.gameState);
	const game = new Game(gameState, setGameState);
	game.init();

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

	const cellSize: number = 50;
	return (
		<div className={"game-wrapper"}>
			<div className="score"></div>
			<div className="additions"></div>
			<div
				className="game"
				style={{
					width: `${cellSize * size}px`,
					height: `${cellSize * size}px`,
				}}
			>
				{grid.map(row =>
					row.map(({ x, y, value, id }) => (
						<Cell x={x} y={y} value={value} key={id} size={cellSize} />
					))
				)}
			</div>
		</div>
	);
};

export default GameContainer;
