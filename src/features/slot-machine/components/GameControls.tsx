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
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        {/* Info Panel */}
        <div className="flex gap-3 md:gap-4">
          <div className="bg-black/80 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-xl border-3 border-green-600/70 shadow-lg">
            <div className="text-[10px] md:text-xs text-green-400 font-black uppercase tracking-wider">Balance</div>
            <div className="text-base md:text-xl font-black text-green-400">
              {formatCurrency(balance)}
            </div>
          </div>

          <div className="bg-black/80 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-xl border-3 border-yellow-600/70 shadow-lg">
            <div className="text-[10px] md:text-xs text-yellow-400 font-black uppercase tracking-wider">Win</div>
            <div className="text-base md:text-xl font-black text-yellow-400">
              {formatCurrency(win)}
            </div>
          </div>

          <div className="bg-black/80 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-xl border-3 border-blue-600/70 shadow-lg">
            <div className="text-[10px] md:text-xs text-blue-400 font-black uppercase tracking-wider">Bet</div>
            <div className="text-base md:text-xl font-black text-blue-400">
              {formatCurrency(bet)}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="default"
            size="icon"
            onClick={onDecreaseBet}
            disabled={isSpinning}
            className="rounded-full w-14 h-14 md:w-16 md:h-16 text-3xl font-black shadow-[0_4px_20px_rgba(34,197,94,0.5)]"
          >
            -
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={onSpin}
            disabled={isSpinning || balance < bet}
            className="px-6 md:px-10 py-5 md:py-7 text-lg md:text-2xl font-black uppercase tracking-wider shadow-[0_8px_30px_rgba(239,68,68,0.6)] hover:shadow-[0_8px_40px_rgba(239,68,68,0.8)]"
          >
            {isSpinning ? 'Spinning...' : 'Spin'}
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={onIncreaseBet}
            disabled={isSpinning}
            className="rounded-full w-14 h-14 md:w-16 md:h-16 text-3xl font-black shadow-[0_4px_20px_rgba(34,197,94,0.5)]"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
