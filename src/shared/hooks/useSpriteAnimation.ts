"use client"

import { useState, useEffect, useRef } from 'react';

interface UseSpriteAnimationProps {
  frameCount: number;
  frameDuration?: number;
  loop?: boolean;
  autoPlay?: boolean;
}

export const useSpriteAnimation = ({
  frameCount,
  frameDuration = 50,
  loop = true,
  autoPlay = true,
}: UseSpriteAnimationProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const frameRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const animate = () => {
      frameRef.current = (frameRef.current + 1) % frameCount;
      setCurrentFrame(frameRef.current);

      if (frameRef.current === frameCount - 1 && !loop) {
        setIsPlaying(false);
        return;
      }

      timeoutRef.current = setTimeout(animate, frameDuration);
    };

    timeoutRef.current = setTimeout(animate, frameDuration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, frameCount, frameDuration, loop]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    frameRef.current = 0;
    setCurrentFrame(0);
  };

  return { currentFrame, isPlaying, play, pause, reset };
};
