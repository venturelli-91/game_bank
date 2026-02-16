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

      <div className="relative z-10 flex flex-col items-center justify-between h-full py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between w-full max-w-6xl">
          <div className="text-2xl font-black text-yellow-500 uppercase tracking-wider bg-black/50 px-6 py-2 rounded-lg border-2 border-yellow-600/50">
            VAULT #1
          </div>
          <div className="text-4xl md:text-5xl font-black uppercase tracking-wider">
            <span className="text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]">
              GAME
            </span>
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              {' '}LOGO
            </span>
          </div>
          <div className="w-32" /> {/* Spacer for balance */}
        </div>

        {/* Slot Machine */}
        <div className="flex-1 flex items-center justify-center">
          <SlotGrid
            reels={gameState.reels}
            isSpinning={gameState.isSpinning}
          />
        </div>

        {/* Controls */}
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
