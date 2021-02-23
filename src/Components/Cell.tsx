import React from "react";
import { ICellProps } from "../interfaces";

const Cell: React.FC<ICellProps> = ({ x, y, id, value, size }: ICellProps) => {
	return (
		<div
			className="cell"
			id={id?.toString()}
			style={{
				left: `${size * x}px`,
				top: `${size * y}px`,
			}}
		>
			{value}
		</div>
	);
};

export default Cell;
