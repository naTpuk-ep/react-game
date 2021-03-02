import React, { useCallback, useEffect, useMemo, useState } from "react";
import Game from "../Game";
import { initCells } from "../initState";
import { IGameState, IGameWrapperProps } from "../interfaces";
import { saveGame } from "../saveGame";
import Grid from "./Grid";

const GameContainer: React.FC<IGameWrapperProps> = props => {
	const [gameState, setGameState] = useState<IGameState>(props.gameState);
	const [canMove, setCanMove] = useState(true);
	const { size, cells, score, highScore } = gameState;
	const game = useMemo(() => new Game(gameState, setGameState, setCanMove), [
		gameState,
	]);

	const useKey = (key: string, callBack: Function): void => {
		useEffect(() => {
			const handler = (event: KeyboardEvent): void => {
				if (event.key === key && canMove) {
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
		setGameState(state => {
			const newState = {
				...state,
				score: 0,
				cells: initCells(state.size),
			};
			saveGame(newState);
			return newState;
		});
	};
	return (
		<div className="game-container">
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
			<Grid size={size} cells={cells} />
		</div>
	);
};

export default GameContainer;
