import React, { useEffect, useState } from "react";
import { IScore, IScoreProps } from "../interfaces";
import { db } from "../network";

const Score: React.FC<IScoreProps> = ({ setShowScore }: IScoreProps) => {
	const [scoreList, setScoreList] = useState([]);
	const getScore = async () => {
		const score = await db.getScore();
		setScoreList(score);
		return score;
	};

	useEffect(() => {
		getScore();
	}, []);

	const score4: any[] = scoreList
		.map((item: IScore) => ({
			name: item.name,
			value: item.four,
		}))
		.sort((a: any, b: any) => b.value - a.value);

	const score6: any[] = scoreList
		.map((item: IScore) => ({
			name: item.name,
			value: item.six,
		}))
		.sort((a: any, b: any) => b.value - a.value);

	const score8: any[] = scoreList
		.map((item: IScore) => ({
			name: item.name,
			value: item.eight,
		}))
		.sort((a: any, b: any) => b.value - a.value);

	return (
		<>
			<div className="top-score">
				<button
					onClick={() => setShowScore(false)}
					className="back header-item"
				>
					<i className="material-icons">exit_to_app</i>
				</button>
				<div className="score-grid">
					<div className="score-column">
						<div className="score-item score-head">4x4</div>
						{score4.map((item, i) =>
							item.value ? (
								<div key={i} className="score-item">
									<span>{item.value}</span>
									<span>{item.name}</span>
								</div>
							) : null
						)}
					</div>
					<div className="score-column center">
						<div className="score-item score-head">6x6</div>
						{score6.map((item, i) =>
							item.value ? (
								<div key={i} className="score-item">
									<span>{item.value}</span>
									<span>{item.name}</span>
								</div>
							) : null
						)}
					</div>
					<div className="score-column">
						<div className="score-item score-head">8x8</div>
						{score8.map((item, i) =>
							item.value ? (
								<div key={i} className="score-item">
									<span>{item.value}</span>
									<span>{item.name}</span>
								</div>
							) : null
						)}
					</div>
				</div>
			</div>
			<div className="modal"></div>
		</>
	);
};

export default Score;
