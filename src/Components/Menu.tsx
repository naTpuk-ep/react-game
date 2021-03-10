import React, { useState } from "react";
import { IMenuProps } from '../interfaces';
import Score from "./Score";

const Menu: React.FC<IMenuProps> = ({
	prevSizeHandler,
	nextSizeHandler,
	startHandler,
	size,
}: IMenuProps) => {

	const [showScore, setShowScore] = useState(false);
	const showScoreHandler = () => {
		setShowScore(true);
	};

	return (
		<>
			{showScore ?
				<Score setShowScore={setShowScore} /> : null}
				<div className="menu">
					<div className="menu-grid">
						<div
							className={
								size === 4 ? "four-pic" : size === 6 ? "six-pic" : "eight-pic"
							}
						/>
					</div>
					<nav className="size-nav">
						<button onClick={prevSizeHandler}>{"<"}</button>
						<span>{`${size}x${size}`}</span>
						<button onClick={nextSizeHandler}>{">"}</button>
					</nav>
					<button className="menu-btn" onClick={startHandler}>
						Start Game
					</button>
					<button className="menu-btn score-btn" onClick={showScoreHandler}>High Score</button>
				</div>
		</>
	);
};

export default Menu
