"use client";

import { useState } from "react";
import { GameCanvas } from "./GameCanvas";
import { useSlotMachine } from "../hooks/useSlotMachine";
import { WinType } from "../types";
import { MIN_BET } from "../utils/constants";

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

const WIN_LABEL: Partial<Record<WinType, string>> = {
	small: "Win!",
	big: "Big Win!",
	mega: "Mega Win!",
	"super-mega": "Super Mega Win!",
};

const WIN_COLOR: Partial<Record<WinType, string>> = {
	small: "text-green-400  border-green-400",
	big: "text-yellow-400 border-yellow-400",
	mega: "text-purple-400 border-purple-400",
	"super-mega": "text-red-400    border-red-400",
};

export const SlotMachineGame = () => {
	const { gameState, spin, increaseBet, decreaseBet, resetGame } =
		useSlotMachine();
	const [isLoaded, setIsLoaded] = useState(false);
	const { balance, bet, win, isSpinning, reels, winType } = gameState;
	const showWin = win > 0 && !isSpinning && winType !== "none";
	const isGameOver = balance < MIN_BET && !isSpinning;

	return (
		<div
			className="relative w-screen h-screen overflow-hidden"
			style={{ maxWidth: "100vw", maxHeight: "100vh" }}>
			{/* Loading screen */}
			{!isLoaded && (
				<div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black gap-6">
					<div className="text-white text-3xl font-black tracking-widest uppercase">
						Loading
					</div>
					<div className="flex gap-2">
						{[0, 1, 2].map((i) => (
							<div
								key={i}
								className="w-3 h-3 rounded-full bg-yellow-400 animate-bounce"
								style={{ animationDelay: `${i * 0.15}s` }}
							/>
						))}
					</div>
				</div>
			)}

			<GameCanvas
				reels={reels}
				isSpinning={isSpinning}
				onLoaded={() => setIsLoaded(true)}
			/>

			{/* Win banner */}
			{showWin && (
				<div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
					<div
						className={`text-center px-12 py-8 rounded-3xl bg-black/75 border-4 animate-bounce ${WIN_COLOR[winType] ?? "text-yellow-400 border-yellow-400"}`}>
						<div className="text-4xl font-black uppercase">
							{WIN_LABEL[winType] ?? "Win!"}
						</div>
						<div className="text-5xl font-black text-yellow-400 mt-2">
							{fmt(win)}
						</div>
					</div>
				</div>
			)}

			{/* Game Over */}
			{isGameOver && (
				<div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80">
					<div className="text-center px-12 py-10 rounded-3xl bg-black/90 border-4 border-red-500/50">
						<div className="text-5xl font-black text-red-500 uppercase mb-2">
							Game Over
						</div>
						<div className="text-lg text-gray-400 mb-8">
							Your balance is {fmt(balance)}
						</div>
						<button
							onClick={resetGame}
							className="px-10 py-4 rounded-xl bg-green-500 hover:bg-green-400 active:scale-95 text-white font-black text-xl uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(34,197,94,0.5)]">
							Play Again
						</button>
					</div>
				</div>
			)}

			{/* Controls */}
			<div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
				<div className="flex items-center gap-4 bg-black/70 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10">
					{/* Stats */}
					<div className="flex gap-4 mr-2">
						<div className="text-center">
							<div className="text-xs text-green-400 font-bold uppercase tracking-wider">
								Balance
							</div>
							<div className="text-lg font-black text-green-400">
								{fmt(balance)}
							</div>
						</div>
						<div className="w-px bg-white/20" />
						<div className="text-center">
							<div className="text-xs text-yellow-400 font-bold uppercase tracking-wider">
								Win
							</div>
							<div className="text-lg font-black text-yellow-400">
								{fmt(win)}
							</div>
						</div>
					</div>

					{/* Bet */}
					<div className="flex items-center gap-2">
						<button
							onClick={decreaseBet}
							disabled={isSpinning}
							className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xl disabled:opacity-40 transition-colors">
							−
						</button>
						<div className="text-center min-w-[80px]">
							<div className="text-xs text-blue-400 font-bold uppercase tracking-wider">
								Bet
							</div>
							<div className="text-lg font-black text-blue-400">{fmt(bet)}</div>
						</div>
						<button
							onClick={increaseBet}
							disabled={isSpinning}
							className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xl disabled:opacity-40 transition-colors">
							+
						</button>
					</div>

					{/* Spin */}
					<button
						onClick={spin}
						disabled={isSpinning || balance < bet}
						className="px-8 py-3 rounded-xl bg-red-500 hover:bg-red-400 active:scale-95 text-white font-black text-lg uppercase tracking-wider disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)]">
						{isSpinning ? "Spinning..." : "Spin"}
					</button>
				</div>
			</div>
		</div>
	);
};
