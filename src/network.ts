import axios from "axios";
import { IStates } from "./interfaces";

export const db = {
	url: "http://react-game-be.herokuapp.com/",

	async getScore() {
		const res = await axios.get(this.url);
		const data = res.data;
		return data;
	},

	async create(name: string) {
		const res = await axios.post(this.url, { name });
		return res.data;
	},

	async update(gameStates: IStates) {
		const userId = JSON.parse(localStorage.getItem("2048-user")!).userId;
		const body = {
			userId,
			four: gameStates[0].highScore,
			six: gameStates[1].highScore,
			eight: gameStates[2].highScore,
		};
		const res = await axios.put(this.url, body);
		return res.data;
	},
};
