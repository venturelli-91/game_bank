import { SlotSymbol, WinResult, WinType } from '../types';
import { SYMBOLS, WIN_THRESHOLDS } from './constants';

export const generateRandomSymbol = (): SlotSymbol => {
  const randomType = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  return {
    type: randomType,
    id: `${randomType}-${Date.now()}-${Math.random()}`,
  };
};

export const generateReels = (reels: number, rows: number): SlotSymbol[][] => {
  return Array.from({ length: reels }, () =>
    Array.from({ length: rows }, () => generateRandomSymbol())
  );
};

export const calculateWin = (reels: SlotSymbol[][], bet: number): WinResult => {
  let matchCount = 0;
  const positions = [];

  for (let row = 0; row < reels[0].length; row++) {
    const firstSymbol = reels[0][row].type;
    let consecutive = 1;

    for (let reel = 1; reel < reels.length; reel++) {
      if (reels[reel][row].type === firstSymbol) {
        consecutive++;
      } else {
        break;
      }
    }

    if (consecutive >= 3) {
      matchCount += consecutive;
      for (let reel = 0; reel < consecutive; reel++) {
        positions.push({ reel, row, symbol: reels[reel][row] });
      }
    }
  }

  const multiplier = matchCount > 0 ? Math.pow(2, matchCount) : 0;
  const amount = bet * multiplier;

  let type: WinType = 'none';
  if (amount >= WIN_THRESHOLDS['super-mega']) {
    type = 'super-mega';
  } else if (amount >= WIN_THRESHOLDS.mega) {
    type = 'mega';
  } else if (amount >= WIN_THRESHOLDS.big) {
    type = 'big';
  } else if (amount >= WIN_THRESHOLDS.small) {
    type = 'small';
  }

  return { amount, type, positions };
};
