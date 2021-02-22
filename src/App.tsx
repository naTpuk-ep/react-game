import React, { useState } from 'react';
import './App.css';
import GameWrapper from './Components/GameWrapper';
import { Grid, IStates, Size } from './interfaces';

//blackMode

const App: React.FC = () => {

  // // const [blackMode, setBlackMode] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);
  const sizes: Size[] =	[4, 6, 8];
	const [size, setSize] = useState<Size>(sizes[0]);

  const setStartState = (): IStates => {
    const state: IStates = {};
    if (localStorage.getItem('gameStates')) {
      return JSON.parse(localStorage.getItem('gameStates')!); 
    }
    sizes.forEach(size => {
      Object.assign(state, {
        [size]: {
          gridSize: size,
          undoMode: true,
          gridState: setGrid()
        }
      })
    })

    return state;
  }

  const setGrid = (): Grid => {
    const grid: Grid = [];
    for (let i = 0; i < size; i++){
        grid[i] = [];
        for (let j = 0; j < size; j++){
            grid[i][j] = null;
    }}
    return grid;
  }

  const startState: IStates = setStartState();

  const startHandler = () => {
    setPlay(true);
  }
	
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
    <>
      {
        play ? 
          <GameWrapper  gameState={startState[size]}/>
        : 
          <>
            <button onClick={prevSizeHandler}>{'<'}</button>
            <button onClick={nextSizeHandler}>{'>'}</button>
            <button onClick={startHandler}>New Game</button>
          </>
      }
    </>
  )


}

export default App;