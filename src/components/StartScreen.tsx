interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gradient-to-br from-cream via-cream-secondary to-sage-light">
      <div className="text-center max-w-sm">
        <h1 className="text-5xl font-bold text-coffee-dark mb-1">Soc Ops</h1>
        <p className="text-xl text-coffee-medium mb-8 font-light">Bingo at the Coffee Shop</p>
        
        <div className="bg-cream rounded-2xl p-8 shadow-lg border-2 border-sage-light mb-8 backdrop-blur-sm">
          <h2 className="font-bold text-coffee-dark mb-4 text-lg">How to play</h2>
          <ul className="text-left text-coffee-medium text-sm space-y-2.5">
            <li className="flex items-start"><span className="mr-3">☕</span> Find people who match the questions</li>
            <li className="flex items-start"><span className="mr-3">✓</span> Tap a square when you find a match</li>
            <li className="flex items-start"><span className="mr-3">🏆</span> Get 5 in a row to win!</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-coffee-medium to-burnt-orange text-cream font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl active:from-coffee-dark active:to-burnt-orange transition-all duration-200 transform hover:scale-105"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
