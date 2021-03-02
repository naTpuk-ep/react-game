import React from "react";
import { ICellProps } from "../interfaces";

const Cell: React.FC<ICellProps> = ({
	x,
	y,
	value,
	size,
	onAnimationStart,
}: ICellProps) => {
	return (
		<div
			onAnimationStart={onAnimationStart}
			className="game__cell play-cell"
			id={value.toString()}
			style={{
				height: `${size}px`,
				width: `${size}px`,
				lineHeight: `${size}px`,
				transform: `translate(${x * (size + 10)}px, ${y * (size + 10)}px)`,
			}}
		>
			{value}
		</div>
	);
};

export default Cell;
