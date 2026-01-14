interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-cream to-cream-secondary rounded-2xl p-8 max-w-xs w-full text-center shadow-2xl animate-[fadeInScale_0.6s_cubic-bezier(0.34,1.56,0.64,1)]">
        <div className="text-6xl mb-4 animate-bounce">☕</div>
        <h2 className="text-4xl font-bold text-burnt-orange mb-2">BINGO!</h2>
        <p className="text-coffee-medium mb-6 text-lg font-light">You completed a line!</p>
        
        <button
          onClick={onDismiss}
          className="w-full bg-gradient-to-r from-coffee-medium to-burnt-orange text-cream font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl active:from-coffee-dark active:to-burnt-orange transition-all duration-200 transform hover:scale-105"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
