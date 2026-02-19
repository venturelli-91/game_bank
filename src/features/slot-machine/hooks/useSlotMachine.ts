"use client"

import { useState, useCallback, useEffect } from 'react';
import { GameState, SlotSymbol } from '../types';
import { generateReels, calculateWin } from '../utils/gameLogic';
import {
  REELS,
  ROWS,
  INITIAL_BALANCE,
  MIN_BET,
  MAX_BET,
  BET_STEP,
  SPIN_DURATION,
} from '../utils/constants';

// Generate fixed initial reels to prevent hydration mismatch
const getInitialReels = (reels: number, rows: number): SlotSymbol[][] => {
  const symbols = ['bank', 'safe', 'dynamite', 'handcuffs', 'cell'];
  return Array.from({ length: reels }, (_, reelIdx) =>
    Array.from({ length: rows }, (_, rowIdx) => ({
      type: symbols[(reelIdx + rowIdx) % symbols.length] as any,
      id: `initial-${reelIdx}-${rowIdx}`,
    }))
  );
};

export const useSlotMachine = () => {
  const [gameState, setGameState] = useState<GameState>({
    balance: INITIAL_BALANCE,
    bet: MIN_BET,
    win: 0,
    isSpinning: false,
    reels: getInitialReels(REELS, ROWS),
    winType: 'none',
  });

  // Randomize reels after hydration on client-side only
  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      reels: generateReels(REELS, ROWS),
    }));
  }, []);

  const increaseBet = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      bet: Math.min(prev.bet + BET_STEP, Math.min(MAX_BET, prev.balance)),
    }));
  }, []);

  const decreaseBet = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      bet: Math.max(prev.bet - BET_STEP, MIN_BET),
    }));
  }, []);

  const spin = useCallback(() => {
    if (gameState.isSpinning || gameState.balance < gameState.bet) return;

    setGameState((prev) => ({
      ...prev,
      isSpinning: true,
      balance: prev.balance - prev.bet,
      winType: 'none',
    }));

    setTimeout(() => {
      const newReels = generateReels(REELS, ROWS);
      const winResult = calculateWin(newReels, gameState.bet);

      setGameState((prev) => ({
        ...prev,
        reels: newReels,
        isSpinning: false,
        win: winResult.amount,
        balance: prev.balance + winResult.amount,
        winType: winResult.type,
      }));
    }, SPIN_DURATION);
  }, [gameState.isSpinning, gameState.balance, gameState.bet]);

  const resetGame = useCallback(() => {
    setGameState({
      balance: INITIAL_BALANCE,
      bet: MIN_BET,
      win: 0,
      isSpinning: false,
      reels: generateReels(REELS, ROWS),
      winType: 'none',
    });
  }, []);

  return {
    gameState,
    increaseBet,
    decreaseBet,
    spin,
    resetGame,
  };
};
