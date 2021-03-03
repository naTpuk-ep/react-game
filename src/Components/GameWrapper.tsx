import React, { useCallback, useEffect, useMemo, useState } from "react";
import Game from "../Game";
import { initCells } from "../initState";
import { IGameState, IGameWrapperProps } from "../interfaces";
import { saveGame } from "../saveGame";
import Grid from "./Grid";

const GameWrapper: React.FC<IGameWrapperProps> = (props) => {
	const [gameState, setGameState] = useState<IGameState>(props.gameState);
	const { score, highScore } = gameState;

	const replayHandler = () => {
		setGameState((state) => {
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
		<>
			<header>
				<div className="score-container">
					<h1 className="title">2048</h1>
					<div className="score-block">
						<div className="score header-item">
							<h5>SCORE</h5>
							<h3>{score}</h3>
						</div>
						<div className="score header-item">
							<h5>HIGH SCORE</h5>
							<h3>{highScore}</h3>
						</div>
					</div>
				</div>
				<nav className="additions">
					<button onClick={props.exitHandler} className="back header-item">
						<i className="material-icons">exit_to_app</i>
					</button>
					<button onClick={replayHandler} className="replay header-item">
						<i className="material-icons">replay</i>
					</button>
				</nav>
			</header>
			<Grid
				gameState={gameState}
				setGameState={setGameState}
				replayHandler={replayHandler}
				exitHandler={props.exitHandler}
			/>
		</>
	);
};

export default GameWrapper;
