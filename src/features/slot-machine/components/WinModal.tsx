"use client"

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { WinType } from '../types';

interface WinModalProps {
  isOpen: boolean;
  winType: WinType;
  amount: number;
  onClose: () => void;
}

const WIN_CONFIG = {
  big: {
    title: 'BIG WIN',
    color: 'text-green-400',
    glow: 'drop-shadow-[0_0_25px_rgba(34,197,94,0.9)]',
  },
  mega: {
    title: 'MEGA WIN',
    color: 'text-purple-400',
    glow: 'drop-shadow-[0_0_25px_rgba(192,132,252,0.9)]',
  },
  'super-mega': {
    title: 'SUPER MEGA WIN',
    color: 'text-red-400',
    glow: 'drop-shadow-[0_0_30px_rgba(248,113,113,0.9)]',
  },
};

export const WinModal = ({ isOpen, winType, amount, onClose }: WinModalProps) => {
  if (winType === 'none' || winType === 'small') return null;

  const config = WIN_CONFIG[winType];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <div className="relative bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl p-12 border-4 border-gray-700/50 shadow-2xl">
          {/* Title */}
          <div
            className={`
              text-5xl md:text-7xl font-black uppercase text-center mb-8
              ${config.color} ${config.glow}
              animate-pulse
            `}
            style={{
              textShadow: '0 0 20px currentColor, 0 0 40px currentColor',
            }}
          >
            {config.title}
          </div>

          {/* Amount */}
          <div
            className="
              bg-gradient-to-r from-gray-800/90 to-gray-700/90
              px-8 py-6 rounded-2xl border-4 border-gray-600/50
              text-center mb-8
            "
          >
            <div className="text-5xl md:text-6xl font-black text-yellow-400">
              $ {amount.toLocaleString('en-US')}
            </div>
          </div>

          {/* Money Bag Emoji (placeholder for animation) */}
          <div className="text-center text-8xl animate-bounce">
            💰
          </div>

          {/* Auto-close hint */}
          <div className="text-center mt-6 text-sm text-gray-400">
            Click anywhere to continue
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
