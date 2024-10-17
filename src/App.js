import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [board, setBoard] = useState(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return; 

    const newBoard = board.map((r) => r.slice());
    newBoard[row][col] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (row, col) => {
    return (
      <button className="square" onClick={() => handleClick(row, col)}>
        {board[row][col]}
      </button>
    );
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="board">
        {board.map((_, row) => (
          <div key={row} className="board-row">
            {board[row].map((_, col) => renderSquare(row, col))}
          </div>
        ))}
      </div>
      <button onClick={() => setBoard(Array(3).fill(null).map(() => Array(3).fill(null)))}>
        Reset Game
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    // Horizontal lines
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Vertical lines
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonal lines
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (let line of lines) {
    const [[a, b], [c, d], [e, f]] = line;
    if (board[a][b] && board[a][b] === board[c][d] && board[a][b] === board[e][f]) {
      return board[a][b];
    }
  }
  return null;
}

export default App;
