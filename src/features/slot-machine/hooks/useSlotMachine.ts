"use client"

import { useState, useCallback } from 'react';
import { GameState } from '../types';
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

export const useSlotMachine = () => {
  const [gameState, setGameState] = useState<GameState>({
    balance: INITIAL_BALANCE,
    bet: MIN_BET,
    win: 0,
    isSpinning: false,
    reels: generateReels(REELS, ROWS),
    winType: 'none',
  });

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

  return {
    gameState,
    increaseBet,
    decreaseBet,
    spin,
  };
};
