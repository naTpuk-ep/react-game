import React, { Key, useEffect, useMemo, useRef, useState } from "react";
import Game from "../Game";
import { IGameState, IGridProps, ModalType } from "../interfaces";
import { saveGame } from "../saveGame";
import Cell from "./Cell";
import Modal from "./Modal";

const Grid: React.FC<IGridProps> = props => {
	const {
		gameState,
		setGameState,
		exitHandler,
		replayHandler,
		playSwipe,
	} = props;
	const [cells, setCells] = useState(gameState.cells);
	const [canMove, setCanMove] = useState(true);
	const { size } = gameState;
	const game = useMemo(() => new Game(gameState, setCells, playSwipe), [
		gameState,
		playSwipe,
	]);
	const [modal, setModal] = useState<ModalType>();
	// const [isMoving, setIsMoving] = useState(false);

	const delay = async (ms: number) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	};

	useEffect(() => {
		if (cells.some(cell => cell.value === 2048) && modal !== "never") {
			setModal("2048");
		}
	}, [cells, modal]);

	useEffect(() => {
		setCells(gameState.cells);
	}, [gameState]);

	useEffect(() => {
		const handler = async (event: KeyboardEvent) => {
			if (canMove) {
				setCanMove(false);
				setCells(game.moveCells(event.key));
				if (game.isMoving()) {
					playSwipe();
				}
				await delay(100);
				setCells(game.removeAndIncreaseCells());
				setCells(game.populateField());
				saveGame(game.state);
				setGameState((state: IGameState) => ({
					...state,
					...game.state,
				}));
				if (game.finish()) {
					setModal("gameover");
				}
				setCanMove(true);
			}
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [canMove, game, playSwipe, setGameState]);

	const cellSize: number = 100;
	const border: number = cellSize / 20;
	return (
		<>
			<div
				className="game"
				style={{
					width: `${cellSize * size + (size + 1) * border * 2}px`,
					height: `${cellSize * size + (size + 1) * border * 2}px`,
					transform: `scale(${4 / size}) translate(${
						(100 * (4 - size)) / 8
					}%, ${(100 * (4 - size)) / 8}%)`,
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
							border={border}
							state={cell.state}
						/>
					))}
				</div>
			</div>
			{modal && modal !== "never" ? (
				<Modal
					setModal={setModal}
					type={modal}
					replayHandler={replayHandler}
					exitHandler={exitHandler}
					setCanMove={setCanMove}
				/>
			) : null}
		</>
	);
};

export default Grid;

	// const useKey = async (key: string, callBack: Function) => {
	// 	useEffect(() => {
	// 		const handler = async (event: KeyboardEvent) => {
	// 			if (event.key === key) {
	// 				console.log(game.gameState);
	// 				await callBack(event);
	// 				setGameState(game.gameState);
	// 			}
	// 		};
	// 		document.addEventListener("keydown", handler);
	// 		return () => document.removeEventListener("keydown", handler);
	// 	}, [callBack, key]);
	// };

	// useKey("ArrowLeft", game.left);
	// useKey("ArrowRight", game.right);
	// useKey("ArrowUp", game.up);
	// useKey("ArrowDown", game.down);
