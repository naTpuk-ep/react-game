import React from "react";
import { IGridProps } from "../interfaces";
import Cell from "./Cell";

const Grid: React.FC<IGridProps> = ({ size, cells }) => {
	const cellSize: number = 100;
	const border: number = 5;
	return (
		<div
			className="game"
			style={{
				width: `${cellSize * size + (size + 1) * border * 2}px`,
				height: `${cellSize * size + (size + 1) * border * 2}px`,
			}}
		>
			<div className="game__background">
				{Array.from(new Array(size ** 2), (_, i) => i).map((_, i) => {
					return (
						<div
							style={{
								height: `${cellSize}px`,
								width: `${cellSize}px`,
							}}
							className="game__cell"
							key={i}
						></div>
					);
				})}
			</div>
			<div className="game__background playground">
				{cells.map(cell => (
					<Cell
						x={cell.x}
						y={cell.y}
						value={cell.value}
						key={cell.id}
						size={cellSize}
					/>
				))}
			</div>
		</div>
	);
};

export default Grid;
