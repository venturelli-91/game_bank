"use client"

import { Button } from '@/components/ui/button';

interface GameControlsProps {
  balance: number;
  win: number;
  bet: number;
  isSpinning: boolean;
  onIncreaseBet: () => void;
  onDecreaseBet: () => void;
  onSpin: () => void;
}

const formatCurrency = (value: number) => {
  return `$ ${value.toLocaleString('en-US')}`;
};

export const GameControls = ({
  balance,
  win,
  bet,
  isSpinning,
  onIncreaseBet,
  onDecreaseBet,
  onSpin,
}: GameControlsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 px-4">
        {/* Info Panel */}
        <div className="flex gap-4 md:gap-6">
          <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-green-500/50">
            <div className="text-xs text-green-400 font-bold uppercase tracking-wider">Balance</div>
            <div className="text-lg md:text-xl font-bold text-green-400">
              {formatCurrency(balance)}
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-yellow-500/50">
            <div className="text-xs text-yellow-400 font-bold uppercase tracking-wider">Win</div>
            <div className="text-lg md:text-xl font-bold text-yellow-400">
              {formatCurrency(win)}
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-blue-500/50">
            <div className="text-xs text-blue-400 font-bold uppercase tracking-wider">Bet</div>
            <div className="text-lg md:text-xl font-bold text-blue-400">
              {formatCurrency(bet)}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            size="icon"
            onClick={onDecreaseBet}
            disabled={isSpinning}
            className="rounded-full w-12 h-12 text-2xl font-bold"
          >
            -
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={onSpin}
            disabled={isSpinning || balance < bet}
            className="px-8 py-6 text-xl font-bold uppercase tracking-wider shadow-xl"
          >
            {isSpinning ? 'Spinning...' : 'Spin'}
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={onIncreaseBet}
            disabled={isSpinning}
            className="rounded-full w-12 h-12 text-2xl font-bold"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
