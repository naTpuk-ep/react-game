import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import { initCells } from "../initState";
import { IGameState, IGameWrapperProps } from "../interfaces";
import { saveGame } from "../saveGame";
import Grid from "./Grid";
import swipeSound from "../sounds/swipe.mp3";

const GameWrapper: React.FC<IGameWrapperProps> = (props) => {
	const [gameState, setGameState] = useState<IGameState>(props.gameState);
	const { score, highScore } = gameState;
	const [volume, setVolume] = useState(0.25);

	useEffect(() => {
		saveGame(gameState);
	}, [gameState]);;

	const [playSwipe] = useSound(swipeSound, { volume });

	const volumeHandler = () => {
		setVolume(volume === 0.25 ? 0.5 : volume === 0.5 ? 0 : 0.25);
	};

	const undoHandler = () => {
		setGameState((state: IGameState) => {
			if (state.prevState) {
				return {
					...state.prevState,
				};
			}
			return state;
		});
	};

	const replayHandler = () => {
		setGameState(state => ({
			...state,
			score: 0,
			cells: initCells(state.size),
			prevState: state,
		}));
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
					<div className="additions__left">
						<button onClick={props.exitHandler} className="back header-item">
							<i className="material-icons">exit_to_app</i>
						</button>
						<button onClick={volumeHandler} className="back header-item">
							<i className="material-icons">
								{volume === 0
									? "volume_mute"
									: volume === 0.25
									? "volume_down"
									: "volume_up"}
							</i>
						</button>
					</div>
					<div className="additions__right">
						<button onClick={undoHandler} className="replay header-item">
							<i className="material-icons">undo</i>
						</button>
						<button onClick={replayHandler} className="replay header-item">
							<i className="material-icons">replay</i>
						</button>
					</div>
				</nav>
			</header>
			<Grid
				gameState={gameState}
				setGameState={setGameState}
				replayHandler={replayHandler}
				exitHandler={props.exitHandler}
				playSwipe={playSwipe}
			/>
		</>
	);
};

export default GameWrapper;
