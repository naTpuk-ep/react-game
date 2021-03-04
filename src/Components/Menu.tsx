import React from 'react'
import { IMenuProps } from '../interfaces';

const Menu: React.FC<IMenuProps> = ({
	prevSizeHandler,
	nextSizeHandler,
	startHandler,
	size,
}: IMenuProps) => {
	return (
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
		</div>
	);
};

export default Menu
