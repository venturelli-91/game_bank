import { SymbolType } from '../types';

export const REELS = 5;
export const ROWS = 3;

export const MIN_BET = 100;
export const MAX_BET = 10000;
export const BET_STEP = 100;

export const INITIAL_BALANCE = 6000;

export const SYMBOLS: SymbolType[] = [
  'A',
  'K',
  'Q',
  'J',
  '10',
  'bank',
  'safe',
  'dynamite',
  'handcuffs',
  'cell',
];

export const WIN_THRESHOLDS = {
  small: 1000,
  big: 50000,
  mega: 500000,
  'super-mega': 5000000,
} as const;

export const SPIN_DURATION = 2000;
export const REEL_DELAY = 150;
