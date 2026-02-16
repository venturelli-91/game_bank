"use client"

import { useState, useEffect } from 'react';
import { GameBackground } from './GameBackground';
import { FoxCharacter } from './FoxCharacter';
import { SlotGrid } from './SlotGrid';
import { GameControls } from './GameControls';
import { WinModal } from './WinModal';
import { useSlotMachine } from '../hooks/useSlotMachine';

export const SlotMachineGame = () => {
  const { gameState, increaseBet, decreaseBet, spin } = useSlotMachine();
  const [showWinModal, setShowWinModal] = useState(false);

  useEffect(() => {
    if (gameState.winType !== 'none' && gameState.winType !== 'small' && !gameState.isSpinning) {
      setShowWinModal(true);
    }
  }, [gameState.winType, gameState.isSpinning]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GameBackground />

      <div className="relative z-10 flex flex-col items-center justify-between h-full py-4 md:py-8 px-2 md:px-4">
        {/* Header */}
        <div className="flex items-center justify-between w-full max-w-7xl px-2">
          <div className="text-lg md:text-2xl font-black text-yellow-500 uppercase tracking-wider bg-black/70 px-3 md:px-6 py-1.5 md:py-2 rounded-lg border-2 border-yellow-600/60 shadow-lg">
            VAULT #1
          </div>
          <div className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider">
            <span className="text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.9)]">
              GAME
            </span>
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
              {' '}LOGO
            </span>
          </div>
          <div className="w-20 md:w-32" />
        </div>

        {/* Slot Machine */}
        <div className="flex-1 flex items-center justify-center w-full max-w-7xl">
          <SlotGrid
            reels={gameState.reels}
            isSpinning={gameState.isSpinning}
          />
        </div>

        {/* Controls */}
        <div className="w-full">
          <GameControls
            balance={gameState.balance}
            win={gameState.win}
            bet={gameState.bet}
            isSpinning={gameState.isSpinning}
            onIncreaseBet={increaseBet}
            onDecreaseBet={decreaseBet}
            onSpin={spin}
          />
        </div>
      </div>

      <FoxCharacter />

      <WinModal
        isOpen={showWinModal}
        winType={gameState.winType}
        amount={gameState.win}
        onClose={() => setShowWinModal(false)}
      />
    </div>
  );
};
