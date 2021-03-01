import React, { useMemo, useState } from "react";
import "./App.scss";
import GameContainer from "./Components/GameContainer";
import Menu from "./Components/Menu";
import { sizes } from "./constants";
import { initState } from "./initState";
import { IStates, Size } from "./interfaces";

//blackMode

const App: React.FC = () => {
	// // const [blackMode, setBlackMode] = useState<boolean>(false);
	const startState: IStates = initState();

	const [play, setPlay] = useState<boolean>(false);
	const [size, setSize] = useState<Size>(sizes[0]);

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

	const exitHandler = () => {
		setPlay(false);
	};

	// const undoModeHandler = (): void => {

	// };

	const gameState = startState[sizes.indexOf(size)];

	return (
		<>
			{play ? (
				<GameContainer gameState={gameState} exitHandler={exitHandler} />
			) : (
				<Menu
					prevSizeHandler={prevSizeHandler}
					nextSizeHandler={nextSizeHandler}
					startHandler={startHandler}
					// undoModeHandler={undoModeHandler}
				/>
			)}
		</>
	);
};

export default App;
