import { SymbolType } from '../types';

export const SYMBOL_PATHS: Record<SymbolType, string> = {
  'A': 'Littera_A',
  'K': 'Littera_K',
  'Q': 'Littera_Q',
  'J': 'Littera_J',
  '10': 'Number_10',
  'bank': 'Bank',
  'safe': 'Safe',
  'dynamite': 'Dynamit',
  'handcuffs': 'Handcuffs',
  'cell': 'Cell',
};

export const SYMBOL_FRAMES = 46;

export const getSymbolFramePath = (symbol: SymbolType, frame: number): string => {
  const folderName = SYMBOL_PATHS[symbol];
  const frameName = `${folderName}_${String(frame).padStart(2, '0')}.png`;
  return `/bank-slots/animation/_Sequences/Objects/${folderName}/${frameName}`;
};
