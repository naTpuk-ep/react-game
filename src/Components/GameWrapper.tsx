import React, { useEffect, useState } from 'react'
import Game from '../Game';
import { IGameState, IGameWrapperProps } from '../interfaces';

const GameWrapper: React.FC<IGameWrapperProps> = (props) => {

  const { 
    gridSize, 
    undoMode, 
    gridState 
  } = props.gameState;
  const [ gameState, setGameState ] = useState<IGameState>(props.gameState);
  const game = new Game(gameState, setGameState);
  const gameGrid = game.gameState.gridState;

  const keyDownHandler = (): void => {
    game.right();
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    };
  })
  
  const cellSize: number = 50;
  return (
    <>
      <main>
        <div className="game" style={{
          width: `${cellSize*gridSize}px`,
          height: `${cellSize*gridSize}px`,
        }}>
          {gridState.map((row, i) => {
            return (
              <div key={i} className="row">
                {row.map((cell, j) => {
                  const id=gridSize*i+j
                  return (
                    <div key={j} id={`${id}`} className="cell" style={{
                      left: `${cellSize*j}px`,
                      top: `${cellSize*i}px`,
                    }}>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </main>
    </>
  );
}

export default GameWrapper
