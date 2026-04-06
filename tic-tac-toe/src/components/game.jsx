import { useState } from 'react';

export function GameBoard(props) {

	const handleCellClick = (colIndex, rowIndex) => () => {
      props.onClick(colIndex, rowIndex);
    };

	return (
		<div className="game-board">
      {props.gameCells.map((row, rowIndex) => (
        <div key={rowIndex} className="game-board-row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="game-board-cell" onClick={handleCellClick(colIndex, rowIndex)}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
