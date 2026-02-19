"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { SlotSymbol as SlotSymbolType, SymbolType } from "../types";
import { SYMBOLS } from "../utils/constants";

const SEQUENCES_BASE = "/bank-slots/animation/_Sequences";

const SYMBOL_FRAMES: Record<
	string,
	{ folder: string; prefix: string; count: number }
> = {
	bank: { folder: "Objects/Bank", prefix: "Bank", count: 46 },
	safe: { folder: "Objects/Safe", prefix: "Safe", count: 46 },
	dynamite: { folder: "Objects/Dynamit", prefix: "Dynamit", count: 46 },
	handcuffs: { folder: "Objects/Handcuffs", prefix: "Handcuffs", count: 46 },
	cell: { folder: "Objects/Cell", prefix: "Cell", count: 46 },
	A: { folder: "Objects/Littera_A", prefix: "Littera_A", count: 46 },
	K: { folder: "Objects/Littera_K", prefix: "Littera_K", count: 46 },
	Q: { folder: "Objects/Littera_Q", prefix: "Littera_Q", count: 46 },
	J: { folder: "Objects/Littera_J", prefix: "Littera_J", count: 46 },
	"10": { folder: "Objects/Number_10", prefix: "Number_10", count: 46 },
};

const FOX = {
	folder: "Character/Idle",
	prefix: "Fox-Idle",
	count: 61,
	x: 1650,
	y: 850,
};
const GRID = { x: 520, y: 280, width: 900, height: 650, cols: 6, rows: 5 };
const BG = {
	width: 1922,
	height: 1082,
	src: "/bank-slots/previews/static previews/main scene 1.png",
};
const SPIN_SPEED = 20;

/** Recompute scale + offsets so the BG fits (contain) inside the canvas */
const computeLayout = (w: number, h: number) => {
	const scale = Math.min(w / BG.width, h / BG.height);
	const ox = (w - BG.width * scale) / 2;
	const oy = (h - BG.height * scale) / 2;
	return { scale, ox, oy };
};

const getFramePaths = (folder: string, prefix: string, count: number) =>
	Array.from(
		{ length: count },
		(_, i) =>
			`${SEQUENCES_BASE}/${folder}/${prefix}_${String(i).padStart(2, "0")}.png`,
	);

interface GameCanvasProps {
	reels: SlotSymbolType[][];
	isSpinning: boolean;
	onLoaded?: () => void;
}

export const GameCanvas = ({
	reels,
	isSpinning,
	onLoaded,
}: GameCanvasProps) => {
	const canvasRef = useRef<HTMLDivElement>(null);
	const appRef = useRef<PIXI.Application | null>(null);
	const spritesRef = useRef<PIXI.AnimatedSprite[][]>([]);
	const texturesRef = useRef<Partial<Record<SymbolType, PIXI.Texture[]>>>({});
	const scaleRef = useRef(1);
	const oxRef = useRef(0);
	const oyRef = useRef(0);

	// Keep a live ref to reels so async init reads the latest value
	const reelsRef = useRef(reels);
	reelsRef.current = reels;

	// Init Pixi app and pre-load all assets
	useEffect(() => {
		if (!canvasRef.current) return;

		const init = async () => {
			const container = canvasRef.current!;
			const initW = container.clientWidth || window.innerWidth;
			const initH = container.clientHeight || window.innerHeight;

			const app = new PIXI.Application();

			await app.init({
				width: initW,
				height: initH,
				backgroundColor: 0x000000,
				resolution: window.devicePixelRatio || 1,
				autoDensity: true,
			});

			// Force canvas to never exceed its container
			const canvas = app.canvas as HTMLCanvasElement;
			canvas.style.width = "100%";
			canvas.style.height = "100%";
			canvas.style.display = "block";

			if (!canvasRef.current) return;
			canvasRef.current.appendChild(canvas);
			appRef.current = app;

			let { scale, ox, oy } = computeLayout(initW, initH);
			scaleRef.current = scale;
			oxRef.current = ox;
			oyRef.current = oy;

			// Background
			const bgTexture = await PIXI.Assets.load(BG.src);
			const bg = new PIXI.Sprite(bgTexture);
			bg.scale.set(scale);
			bg.x = ox;
			bg.y = oy;
			app.stage.addChild(bg);

			// Fox
			const foxTextures = await Promise.all(
				getFramePaths(FOX.folder, FOX.prefix, FOX.count).map((p) =>
					PIXI.Assets.load<PIXI.Texture>(p),
				),
			);
			const fox = new PIXI.AnimatedSprite(foxTextures);
			fox.animationSpeed = 0.3;
			fox.loop = true;
			fox.anchor.set(0.5);
			fox.x = ox + FOX.x * scale;
			fox.y = oy + FOX.y * scale;
			fox.scale.set(-(scale * 1.2), scale * 1.2);
			fox.play();
			app.stage.addChild(fox);

			// Pre-load ALL symbol textures in parallel (10 types × 46 frames simultaneously)
			await Promise.all(
				SYMBOLS.map(async (symbolType) => {
					const config = SYMBOL_FRAMES[symbolType];
					if (!config) return;
					texturesRef.current[symbolType] = await Promise.all(
						getFramePaths(config.folder, config.prefix, config.count).map((p) =>
							PIXI.Assets.load<PIXI.Texture>(p),
						),
					);
				}),
			);

			// Create sprites using the latest reels at the time loading finished
			const cellW = GRID.width / GRID.cols;
			const cellH = GRID.height / GRID.rows;
			const currentReels = reelsRef.current;
			spritesRef.current = [];

			for (let col = 0; col < currentReels.length; col++) {
				spritesRef.current[col] = [];
				for (let row = 0; row < currentReels[col].length; row++) {
					const textures = texturesRef.current[currentReels[col][row].type];
					if (!textures) continue;

					const sprite = new PIXI.AnimatedSprite(textures);
					sprite.animationSpeed = 0.3;
					sprite.loop = true;
					sprite.anchor.set(0.5);
					sprite.x = ox + (GRID.x + col * cellW + cellW / 2) * scale;
					sprite.y = oy + (GRID.y + row * cellH + cellH / 2) * scale;
					sprite.scale.set(scale * 0.8);
					sprite.play();
					app.stage.addChild(sprite);
					spritesRef.current[col][row] = sprite;
				}
			}

			onLoaded?.();

			// Resize handler – keep canvas + all objects fitting the viewport
			const onResize = () => {
				const w = canvasRef.current?.clientWidth ?? window.innerWidth;
				const h = canvasRef.current?.clientHeight ?? window.innerHeight;
				app.renderer.resize(w, h);

				const layout = computeLayout(w, h);
				scale = layout.scale;
				ox = layout.ox;
				oy = layout.oy;
				scaleRef.current = scale;
				oxRef.current = ox;
				oyRef.current = oy;

				// Reposition background
				bg.scale.set(scale);
				bg.x = ox;
				bg.y = oy;

				// Reposition fox
				fox.x = ox + FOX.x * scale;
				fox.y = oy + FOX.y * scale;
				fox.scale.set(-(scale * 1.2), scale * 1.2);

				// Reposition symbols
				const cellW = GRID.width / GRID.cols;
				const cellH = GRID.height / GRID.rows;
				spritesRef.current.forEach((col, colIdx) => {
					col.forEach((sprite, rowIdx) => {
						sprite.x = ox + (GRID.x + colIdx * cellW + cellW / 2) * scale;
						sprite.y = oy + (GRID.y + rowIdx * cellH + cellH / 2) * scale;
						sprite.scale.set(scale * 0.8);
					});
				});
			};
			window.addEventListener("resize", onResize);
			(app as unknown as { _resizeHandler: () => void })._resizeHandler =
				onResize;
		};

		init().catch(console.error);

		return () => {
			const app = appRef.current;
			if (app) {
				const handler = (app as unknown as { _resizeHandler?: () => void })
					._resizeHandler;
				if (handler) window.removeEventListener("resize", handler);
				app.destroy(true, { children: true });
			}
			appRef.current = null;
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Spin: scroll all symbols downward, cycling random textures at wrap
	useEffect(() => {
		if (!isSpinning || !appRef.current || spritesRef.current.length === 0)
			return;

		const app = appRef.current;
		const scale = scaleRef.current;
		const oy = oyRef.current;
		const cellH = (GRID.height / GRID.rows) * scale;
		const gridBottom = oy + (GRID.y + GRID.height) * scale;
		const symbolTypes = Object.keys(texturesRef.current) as SymbolType[];

		const onTick = () => {
			spritesRef.current.forEach((col) => {
				col.forEach((sprite) => {
					sprite.y += SPIN_SPEED * scale;
					if (sprite.y > gridBottom + cellH / 2) {
						sprite.y -= (GRID.rows + 1) * cellH;
						const randomType =
							symbolTypes[Math.floor(Math.random() * symbolTypes.length)];
						sprite.textures = texturesRef.current[randomType]!;
						sprite.play();
					}
				});
			});
		};

		app.ticker.add(onTick);
		return () => {
			app.ticker.remove(onTick);
		};
	}, [isSpinning]);

	// Snap: restore correct symbols and positions when spin ends
	useEffect(() => {
		if (isSpinning || spritesRef.current.length === 0) return;

		const scale = scaleRef.current;
		const ox = oxRef.current;
		const oy = oyRef.current;
		const cellW = GRID.width / GRID.cols;
		const cellH = GRID.height / GRID.rows;

		spritesRef.current.forEach((col, colIdx) => {
			col.forEach((sprite, rowIdx) => {
				const symbolType = reels[colIdx]?.[rowIdx]?.type;
				if (symbolType && texturesRef.current[symbolType]) {
					sprite.textures = texturesRef.current[symbolType]!;
					sprite.play();
				}
				sprite.x = ox + (GRID.x + colIdx * cellW + cellW / 2) * scale;
				sprite.y = oy + (GRID.y + rowIdx * cellH + cellH / 2) * scale;
			});
		});
	}, [reels, isSpinning]);

	return (
		<div
			ref={canvasRef}
			className="absolute inset-0 w-full h-full"
			style={{
				touchAction: "none",
				overflow: "hidden",
				maxWidth: "100vw",
				maxHeight: "100vh",
			}}
		/>
	);
};
