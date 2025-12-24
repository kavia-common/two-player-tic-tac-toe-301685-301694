import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

function getAllSquares() {
  return screen.getAllByRole('button', { name: /row \d column \d/i });
}

test('renders a 3x3 grid of squares', () => {
  render(<App />);
  const rows = screen.getAllByRole('row');
  expect(rows.length).toBe(3);

  const squares = getAllSquares();
  expect(squares.length).toBe(9);
});

test('alternating turns between X and O', () => {
  render(<App />);
  const squares = getAllSquares();
  fireEvent.click(squares[0]); // X
  expect(squares[0]).toHaveTextContent('X');
  fireEvent.click(squares[1]); // O
  expect(squares[1]).toHaveTextContent('O');
});

test('win detection', () => {
  render(<App />);
  const sq = getAllSquares();
  // X wins on top row: 0,1,2
  fireEvent.click(sq[0]); // X
  fireEvent.click(sq[3]); // O
  fireEvent.click(sq[1]); // X
  fireEvent.click(sq[4]); // O
  fireEvent.click(sq[2]); // X wins

  expect(screen.getByRole('status')).toHaveTextContent(/winner: x/i);
});

test('draw detection', () => {
  render(<App />);
  const s = getAllSquares();
  // Fill board without winner:
  // X O X
  // X X O
  // O X O
  fireEvent.click(s[0]); // X
  fireEvent.click(s[1]); // O
  fireEvent.click(s[2]); // X
  fireEvent.click(s[5]); // O
  fireEvent.click(s[3]); // X
  fireEvent.click(s[6]); // O
  fireEvent.click(s[4]); // X
  fireEvent.click(s[8]); // O
  fireEvent.click(s[7]); // X

  expect(screen.getByRole('status')).toHaveTextContent(/draw/i);
});

test('restart resets state', () => {
  render(<App />);
  const s = getAllSquares();
  fireEvent.click(s[0]); // X
  expect(s[0]).toHaveTextContent('X');

  const restart = screen.getByRole('button', { name: /restart/i });
  fireEvent.click(restart);

  const s2 = getAllSquares();
  s2.forEach((sq) => expect(sq).toHaveTextContent(''));
  expect(screen.getByRole('status')).toHaveTextContent(/next: x/i);
});
