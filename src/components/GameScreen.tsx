import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-cream via-cream-secondary to-sage-light">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gradient-to-r from-coffee-dark to-coffee-medium shadow-md">
        <button
          onClick={onReset}
          className="text-cream text-sm px-3 py-1.5 rounded-full active:bg-coffee-medium transition-colors hover:bg-coffee-medium"
        >
          ← Back
        </button>
        <h1 className="font-bold text-cream text-lg">Soc Ops Bingo</h1>
        <div className="w-16"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-coffee-medium text-sm py-3 px-4 font-light">
        Find someone who matches each square
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="bg-gradient-to-r from-burnt-orange to-coffee-light text-cream text-center py-3 font-bold text-sm shadow-md">
          ☕ BINGO! You got a line!
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-4">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
