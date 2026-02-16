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
      <div className="bg-gradient-to-b from-gray-700/95 to-gray-800/95 backdrop-blur-sm p-4 md:p-6 rounded-3xl border-8 border-gray-600/80 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className="grid grid-cols-5 gap-1.5 md:gap-2">
          {reels.map((reel, reelIndex) => (
            <div key={reelIndex} className="flex flex-col gap-1.5 md:gap-2">
              {reel.map((symbol, rowIndex) => (
                <div
                  key={`${reelIndex}-${rowIndex}-${symbol.id}`}
                  className={`
                    bg-black/80 rounded-md border-2 border-red-800/70
                    flex items-center justify-center p-1 md:p-2
                    transition-all duration-200
                    shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]
                    ${isSpinning ? 'animate-pulse brightness-50' : ''}
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
