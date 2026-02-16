"use client"

import Image from 'next/image';
import { useSpriteAnimation } from '@/shared/hooks/useSpriteAnimation';
import { SymbolType } from '../types';
import { getSymbolFramePath, SYMBOL_FRAMES } from '../utils/symbolMapping';

interface SlotSymbolProps {
  symbol: SymbolType;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: 'w-16 h-16',
  md: 'w-20 h-20',
  lg: 'w-24 h-24',
};

export const SlotSymbol = ({ symbol, animate = false, size = 'lg' }: SlotSymbolProps) => {
  const { currentFrame } = useSpriteAnimation({
    frameCount: SYMBOL_FRAMES,
    frameDuration: 40,
    loop: true,
    autoPlay: animate,
  });

  const framePath = getSymbolFramePath(symbol, animate ? currentFrame : 0);

  return (
    <div className={`relative ${SIZE_MAP[size]} flex items-center justify-center`}>
      <Image
        src={framePath}
        alt={symbol}
        fill
        className="object-contain"
        unoptimized
      />
    </div>
  );
};
