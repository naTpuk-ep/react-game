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
	const [play, setPlay] = useState<boolean>(false);
	const [size, setSize] = useState<Size>(sizes[0]);

	const startState: IStates = useMemo(() => initState(size), [size]);

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

	console.log(startState[size].grid);

	return (
		<>
			{play
				? <GameContainer gameState={startState[size]} />
				: <Menu
					prevSizeHandler={prevSizeHandler}
					nextSizeHandler={nextSizeHandler}
					startHandler={startHandler}
				/>
			}
		</>
	);
};

export default App;
