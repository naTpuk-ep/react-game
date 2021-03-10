import React, { useState } from "react";
import "./App.scss";
import GameWrapper from "./Components/GameWrapper";
import Menu from "./Components/Menu";
import User from "./Components/User";
import { sizes } from "./constants";
import getUser from "./getUser";
import { initState } from "./initState";
import { IStates, Size } from "./interfaces";

const App: React.FC = () => {
	const startState: IStates = initState();

	const [user, setUser] = useState(getUser());

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

	const gameState = startState[sizes.indexOf(size)];

	return (
		<div className="container">
			{play ? (
				<GameWrapper gameState={gameState} exitHandler={exitHandler} />
			) : (
				<Menu
					prevSizeHandler={prevSizeHandler}
					nextSizeHandler={nextSizeHandler}
					startHandler={startHandler}
					size={size}
				/>
			)}
			{user ? null : <User setUser={setUser} />}
		</div>
	);
};

export default App;
