import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

// PUBLIC_INTERFACE
export default function Board({ squares, onSquareClick, disabled, winningLine, nextPlayer }) {
  /** Renders the 3x3 Tic Tac Toe board as a grid of Square components. */

  const renderSquare = (i, row, col) => {
    const isWinning = winningLine ? winningLine.includes(i) : false;
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        disabled={disabled || Boolean(squares[i])}
        isWinning={isWinning}
        row={row}
        col={col}
        nextPlayer={nextPlayer}
      />
    );
  };

  const rows = [0, 1, 2];
  const cols = [0, 1, 2];

  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {rows.map((r) => (
        <div className="ttt-row" role="row" key={r}>
          {cols.map((c) => {
            const idx = r * 3 + c;
            return (
              <div className="ttt-cell" role="gridcell" key={idx}>
                {renderSquare(idx, r, c)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null])).isRequired,
  onSquareClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  winningLine: PropTypes.arrayOf(PropTypes.number),
  nextPlayer: PropTypes.oneOf(['X', 'O']).isRequired,
};

Board.defaultProps = {
  disabled: false,
  winningLine: null,
};
