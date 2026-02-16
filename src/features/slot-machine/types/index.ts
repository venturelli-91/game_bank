export type SymbolType =
  | 'A'
  | 'K'
  | 'Q'
  | 'J'
  | '10'
  | 'bank'
  | 'safe'
  | 'dynamite'
  | 'handcuffs'
  | 'cell';

export interface SlotSymbol {
  type: SymbolType;
  id: string;
}

export interface ReelPosition {
  reel: number;
  row: number;
  symbol: SlotSymbol;
}

export type WinType = 'none' | 'small' | 'big' | 'mega' | 'super-mega';

export interface GameState {
  balance: number;
  bet: number;
  win: number;
  isSpinning: boolean;
  reels: SlotSymbol[][];
  winType: WinType;
}

export interface WinResult {
  amount: number;
  type: WinType;
  positions: ReelPosition[];
}
