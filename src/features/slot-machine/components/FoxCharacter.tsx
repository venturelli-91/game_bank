"use client"

import Image from 'next/image';
import { useSpriteAnimation } from '@/shared/hooks/useSpriteAnimation';

const FOX_IDLE_FRAMES = 61;

export const FoxCharacter = () => {
  const { currentFrame } = useSpriteAnimation({
    frameCount: FOX_IDLE_FRAMES,
    frameDuration: 50,
    loop: true,
    autoPlay: true,
  });

  const framePath = `/bank-slots/animation/_Sequences/Character/Idle/Fox-Idle_${String(currentFrame).padStart(2, '0')}.png`;

  return (
    <div className="absolute bottom-8 right-8 w-48 h-48 md:w-64 md:h-64 pointer-events-none z-10">
      <Image
        src={framePath}
        alt="Fox Character"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};
