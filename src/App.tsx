import React from 'react';
import './App.css';

const App: React.FC = () => {

  const fieldSize: number = 4;
  const cellSize: number = 50;

  const field: Array<Array<number | null>> = [];

  for (let i = 0; i < fieldSize; i++) {
    field[i] = [];
    for (let j = 0; j < fieldSize; j++) {
      field[i].push(null);
    }
  }

  console.log(field);
  
  return (
    <>
      <main>
        <div className="game" style={{
          width: `${cellSize*fieldSize}px`,
          height: `${cellSize*fieldSize}px`,
        }}>
          {field.map((row, i) => {
            return (
              <div key={i} className="row">
                {row.map((cell, j) => {
                  const id=fieldSize*i+j
                  return (
                    <div key={j} id={`${id}`} className="cell" style={{
                      left: `${cellSize*j}px`,
                      top: `${cellSize*i}px`,
                    }}>
                      {id}
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

export default App;