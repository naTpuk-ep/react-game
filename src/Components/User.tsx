import React, { FormEvent, useState } from "react";
import { IUserProps } from "../interfaces";
import { db } from "../network";

const User: React.FC<IUserProps> = ({ setUser }: IUserProps) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState("");

	const onInput = (event: FormEvent<HTMLInputElement>) => {
		const inputValue = event.currentTarget.value;
		setValue(inputValue);
		if (error !== "") {
			setError("");
		}
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const res = await db.create(value);
			if (res.statusCode === 404) {
				setError(res.reason);
				return;
			}
			const { name, userId } = res;
			setUser({
				name,
				userId,
			});
			localStorage.setItem(
				"2048-user",
				JSON.stringify({
					name,
					userId,
				})
			);
		} catch (e) {
			if (e instanceof Error) {
				console.warn(e.message);
			}
		}
	};
	return (
		<>
			<div className="modal"></div>
			<form onSubmit={onSubmit} className="user">
				<input
					placeholder="Enter Name"
					type="text"
					onInput={onInput}
					value={value}
				/>
				<span>{error}</span>
				<button type="submit" className="modal__btn">
					Confirm
				</button>
			</form>
		</>
	);
};

export default User;
