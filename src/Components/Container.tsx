import React, { useCallback, useEffect, useMemo, useState } from "react";
import Game from "../Game";
import { initCells } from "../initState";
import { IGameState, IGameWrapperProps } from "../interfaces";
import { saveGame } from "../saveGame";
import Grid from "./Grid";

const GameContainer: React.FC<IGameWrapperProps> = props => {
	const [gameState, setGameState] = useState<IGameState>(props.gameState);
	const { score, highScore } = gameState;

	console.log('wrap render');
	

	const replayHandler = () => {
		setGameState(state => {
			const newState = {
				...state,
				score: 0,
				cells: initCells(state.size),
				prevState: state,
			};
			saveGame(newState);
			return newState;
		});
	};
	return (
		<div className="game-container">
			<header>
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
			</header>
			<Grid gameState={gameState} setGameState={setGameState} />
		</div>
	);
};

export default GameContainer;
