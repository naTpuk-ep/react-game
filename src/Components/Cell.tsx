import React, { createRef, useEffect, useRef, useState } from "react";
import { getValueStyle } from "../initState";
import { CellStates, ICellProps } from "../interfaces";

const Cell: React.FC<ICellProps> = ({
	x,
	y,
	value,
	size,
	border,
	state,
}: ICellProps) => {
	const [currValue, setCurrValue] = useState(value);
	const [highLight, setHighLight] = useState(false);
	const cellRef = createRef<HTMLDivElement>();

	// const onTransitionEnd = () => {
	// 	if (value !== currValue) {
	// 		console.log(value, currValue, state);
	// 		setCurrValue(value);
	// 		setHighLight(true)
	// 	}
	// };

	const onAnimationEnd = () => {
		setHighLight(false);
	};

	useEffect(() => {
		if (value !== currValue) {
			setHighLight(true);
		}
	}, [currValue, value]);

	useEffect(() => {
		const onTransitionEnd = (event: TransitionEvent) => {
			if (value !== currValue) {
				setCurrValue(value);
			}
		};
		const cell = cellRef.current;
		cell?.addEventListener("transitionend", onTransitionEnd);
		return () => cell?.removeEventListener("transitionend", onTransitionEnd);
	}, [cellRef, currValue, state, value]);

	const className = `${getValueStyle(value)} game__cell play-cell ${
		state === CellStates.MOVING || state === CellStates.INCREASE ? "moving" : ""
	} ${highLight ? "highlight" : ""} ${state === CellStates.NEW ? "new" : ""} `;

	return (
		<div
			ref={cellRef}
			onAnimationEnd={onAnimationEnd}
			className={className}
			id={value.toString()}
			style={{
				height: `${size}px`,
				width: `${size}px`,
				lineHeight: `${size}px`,
				left: `${x * (size + 10) + border}px`,
				top: `${y * (size + 10) + border}px`,
			}}
		>
			{value}
		</div>
	);
};

export default Cell;

// button.addEventListener("click", e => {
// 	animate(div, Math.random() * Math.PI * 2).then(() => alert("done"));
// });

// function onAnimationComplete(elem, resolve) {
// 	elem.removeEventListener("transitionend", onAnimationComplete);
// 	resolve();
// }

// function animate(elem, angle) {
// 	return new Promise((resolve, reject) => {
// 		elem.addEventListener(
// 			"transitionend",
// 			e => onAnimationComplete(elem, resolve),
// 			false
// 		);

// 		elem.style.transform = "rotate(" + angle + "rad)";
// 	});
// }
