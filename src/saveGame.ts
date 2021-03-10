import { IGameState } from "./interfaces";
import { db } from "./network";

export const saveGame = (gameState: IGameState) => {
	const saveStates: IGameState[] = JSON.parse(localStorage.getItem("2048")!);
	const newStates = saveStates.map(state => {
		if (state.size === gameState.size) {
			return gameState;
		}
		return state;
	});
	
	localStorage.setItem("2048", JSON.stringify(newStates));
	db.update(newStates);
};
