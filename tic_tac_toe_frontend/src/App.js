import React, { useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Board from './components/Board';
import calculateWinner from './utils/calculateWinner';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Game controller for the Tic Tac Toe app.
   * Manages: squares state, current player, winner/draw detection, and restart logic.
   */

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [moveCount, setMoveCount] = useState(0);

  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const isBoardFull = moveCount >= 9;
  const isDraw = !winner && isBoardFull;

  // PUBLIC_INTERFACE
  const handleSquareClick = (i) => {
    /** Handles a user click on square i; ignores clicks if filled or game ended. */
    if (squares[i] || winner || isDraw) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setMoveCount((c) => c + 1);
  };

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    /** Resets the game to initial state. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setMoveCount(0);
  };

  const nextPlayer = xIsNext ? 'X' : 'O';

  let statusText = '';
  if (winner) {
    statusText = `Winner: ${winner}`;
  } else if (isDraw) {
    statusText = 'Draw';
  } else {
    statusText = `Next: ${nextPlayer}`;
  }

  return (
    <div className="app-shell">
      <main className="game-container">
        <h1 className="title">Tic Tac Toe</h1>

        <div className="status" aria-live="polite" role="status">
          {statusText}
        </div>

        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          disabled={Boolean(winner) || isDraw}
          winningLine={line}
          nextPlayer={nextPlayer}
        />

        <button
          type="button"
          className="btn-restart"
          onClick={handleRestart}
          aria-label="Restart the game"
        >
          Restart
        </button>
      </main>
    </div>
  );
}
