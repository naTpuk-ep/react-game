import React from "react";
import { ICellProps } from "../interfaces";

const Cell: React.FC<ICellProps> = ({ x, y, value, size }: ICellProps) => {
	return (
		<div
			className="game__cell play-cell"
			// id={id?.toString()}
			style={{
				height: `${size}px`,
				width: `${size}px`,
				// left: `${(size + 10) * x + border}px`,
				// top: `${(size + 10) * y + border}px`,
				lineHeight: `${size}px`,
				transform: `translate(${x * (size + 10)}px, ${y * (size + 10)}px)`,
			}}
		>
			{value}
		</div>
	);
};

export default Cell;
