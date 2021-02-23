import React from 'react'
import { IMenuProps } from '../interfaces';

const Menu:React.FC<IMenuProps> = ({ prevSizeHandler, nextSizeHandler, startHandler }: IMenuProps) => {
	return (
		<>
			<button onClick={prevSizeHandler}>{'<'}</button>
			<button onClick={nextSizeHandler}>{'>'}</button>
			<button onClick={startHandler}>New Game</button>
		</>
	)
}

export default Menu
