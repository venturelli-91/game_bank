"use client"

import { SlotSymbol } from './SlotSymbol';
import { SlotSymbol as SlotSymbolType } from '../types';

interface SlotGridProps {
  reels: SlotSymbolType[][];
  isSpinning: boolean;
}

export const SlotGrid = ({ reels, isSpinning }: SlotGridProps) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-6 rounded-2xl border-4 border-gray-700/50 shadow-2xl">
        <div className="grid grid-cols-5 gap-2 md:gap-3">
          {reels.map((reel, reelIndex) => (
            <div key={reelIndex} className="flex flex-col gap-2 md:gap-3">
              {reel.map((symbol, rowIndex) => (
                <div
                  key={`${reelIndex}-${rowIndex}-${symbol.id}`}
                  className={`
                    bg-black/60 rounded-lg border-2 border-red-900/50
                    flex items-center justify-center p-2
                    transition-all duration-200
                    ${isSpinning ? 'animate-pulse' : ''}
                  `}
                >
                  <SlotSymbol
                    symbol={symbol.type}
                    animate={!isSpinning}
                    size="lg"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
