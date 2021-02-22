import React, { useState } from 'react'
import { Size } from '../interfaces'

const GridSizeOption: React.FC = () => {

	const sizes: Size[] =	[4, 6, 8];
	const [size, setSize] = useState<Size>(sizes[0]);
	
  const nextSizeHandler = () => {
		setSize(
			sizes.indexOf(size) + 1 >= sizes.length
			? sizes[0]
			: sizes[sizes.indexOf(size) + 1]
		)
  }

	const prevSizeHandler = () => {
		setSize(
			sizes.indexOf(size) === 0
			? sizes[sizes.length - 1]
			: sizes[sizes.indexOf(size) - 1]
		)
	}

	return (
		<div>
			<button onClick={prevSizeHandler}>{'<'}</button>
			<button onClick={nextSizeHandler}>{'>'}</button>
		</div>
	)
}

export default GridSizeOption
