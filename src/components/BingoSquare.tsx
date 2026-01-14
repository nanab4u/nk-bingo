import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-2 text-center border-2 rounded-xl transition-all duration-200 select-none min-h-[60px] text-xs leading-tight font-medium shadow-sm';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-gradient-to-br from-burnt-orange to-coffee-light border-burnt-orange text-cream shadow-md'
      : 'bg-marked border-marked-border text-coffee-medium shadow-md'
    : 'bg-cream border-sage-light text-coffee-medium hover:border-coffee-light active:bg-sage-light';

  const freeSpaceClasses = square.isFreeSpace ? 'font-bold text-sm bg-sage-light border-sage text-coffee-dark' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-1 right-1 text-cream text-sm">✓</span>
      )}
    </button>
  );
}
