import React from "react";
import { ModalProps } from "../interfaces";

const Modal: React.FC<ModalProps> = ({
	type,
	setModal,
	replayHandler,
	exitHandler,
	setCanMove,
}: ModalProps) => {
	const continueHandler = () => {
		setCanMove(true);
		setModal("never");
	};

	if (type === "2048") {
		setCanMove(false);
	}

	return (
		<div className="modal">
			{type === "2048" ? (
				<div className="modal__btns">
					<button className="modal__btns__btn" onClick={continueHandler}>
						Continue
					</button>
					<button
						className="modal__btns__btn"
						onClick={() => {
							setModal(undefined);
							replayHandler();
						}}
					>
						Replay
					</button>
				</div>
			) : (
				<div className="modal__btns">
					<button className="modal__btns__btn" onClick={exitHandler}>
						EXIT
					</button>
					<button
						className="modal__btns__btn"
						onClick={() => {
							setModal(undefined);
							replayHandler();
						}}
					>
						REPLAY
					</button>
				</div>
			)}
		</div>
	);
};

export default Modal;