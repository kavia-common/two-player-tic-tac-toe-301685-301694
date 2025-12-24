import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
export default function Square({
  value,
  onClick,
  disabled,
  isWinning,
  row,
  col,
  nextPlayer,
}) {
  /** Renders a single Tic Tac Toe square as a button with accessibility features. */

  const ariaLabel = value
    ? `Cell at row ${row + 1} column ${col + 1} has ${value}`
    : `Place ${nextPlayer} at row ${row + 1} column ${col + 1}`;

  return (
    <button
      type="button"
      className={`ttt-square${isWinning ? ' winning' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', null]),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isWinning: PropTypes.bool,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  nextPlayer: PropTypes.oneOf(['X', 'O']).isRequired,
};

Square.defaultProps = {
  value: null,
  disabled: false,
  isWinning: false,
}
