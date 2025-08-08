// Import React hooks and styles
import { useRef, useState, useMemo } from 'react';
import './styles/App.scss';

// Constants for the board dimensions
import { BOARD_HEIGHT, BOARD_WIDTH } from './utils/config';

// Import helper functions
import getRandomShape from './utils/shapes';
import {
	getShapeCells,
	getMergedBoard,
	getNextDifferentShape,
	formatTime,
} from './utils/utils';

// Import UI components
import GameBoard from './components/GameBoard';
import NextShapePreview from './components/NextShapePreview';
import Buttons from './components/Buttons';
import GameStats from './components/GameStats';
import GameOver from './components/GameOver';
import Home from './components/Home';
import Pause from './components/Pause';

// Import custom hooks
import useGameLoop from './hooks/useGameLoop';
import useInputHandler from './hooks/useInputHandler';
import useGameTimer from './hooks/useGameTimer';
import { useGameStatus } from './hooks/useGameStatus';
import useGameController from './hooks/useGameController';

function App() {
	// Game status and control functions from custom hook
	const { gameStatus, setGameStatus, setIsGameOver, setIsPaused, setIsInHome } =
		useGameStatus();

	// Game statistics: score, lines cleared, current level
	const [gameStats, setGameStats] = useState({
		score: 0,
		lines: 0,
		level: 1,
	});

	// Track which lines are currently clearing (for animation)
	const [clearingLines, setClearingLines] = useState([]);

	// Highlight cells that have just landed
	const [justLandedCells, setJustLandedCells] = useState([]);

	// Generate first random shape (Tetrimino)
	const [currentShape, setCurrentShape] = useState(() => getRandomShape());

	// Memoized cells of current shape
	const currentShapeCells = useMemo(
		() => getShapeCells(currentShape),
		[currentShape]
	);

	// Generate next shape preview
	const [nextShape, setNextShape] = useState(() =>
		getNextDifferentShape(currentShape)
	);

	// Memoized cells of next shape
	const nextShapeCells = useMemo(() => getShapeCells(nextShape), [nextShape]);

	// Initialize empty board
	const [board, setBoard] = useState(() =>
		Array(BOARD_HEIGHT)
			.fill(null)
			.map(() => Array(BOARD_WIDTH).fill(0))
	);

	// Ref to check if piece is in "locking" phase (prevents double movement)
	const isLocking = useRef(false);

	// Game timer: only runs when game is active
	const isRunning = !gameStatus.isPaused && !gameStatus.isGameOver;
	const { elapsedTime, resetTimer } = useGameTimer({
		isRunning,
		isInHome: gameStatus.isInHome,
	});

	// Handle player input (keyboard)
	useInputHandler({
		board,
		currentShape,
		currentShapeCells,
		isGameOver: gameStatus.isGameOver,
		isPaused: gameStatus.isPaused,
		isInHome: gameStatus.isInHome,
		setCurrentShape,
	});

	// Main game loop: dropping logic, collision, scoring, etc.
	const { resetTick } = useGameLoop({
		board,
		currentShape,
		currentShapeCells,
		nextShape,
		lines: gameStats.lines,
		level: gameStats.level,
		isLocking,
		isGameOver: gameStatus.isGameOver,
		isPaused: gameStatus.isPaused,
		isInHome: gameStatus.isInHome,
		setCurrentShape,
		setNextShape,
		setBoard,

		// Functional setters for score/lines/level
		setScore: updater =>
			setGameStats(prev => ({
				...prev,
				score: typeof updater === 'function' ? updater(prev.score) : updater,
			})),
		setLines: updater =>
			setGameStats(prev => ({
				...prev,
				lines: typeof updater === 'function' ? updater(prev.lines) : updater,
			})),
		setLevel: updater =>
			setGameStats(prev => ({
				...prev,
				level: typeof updater === 'function' ? updater(prev.level) : updater,
			})),

		setIsGameOver,
		setClearingLines,
		setJustLandedCells,
		nextShapeCells,
	});

	// Game controller (restart logic, etc.)
	const { restartGame } = useGameController({
		setGameStatus,
		setGameStats,
		setClearingLines,
		setCurrentShape,
		setNextShape,
		setBoard,
		resetTimer,
		resetTick,
		isLockingRef: isLocking,
		getNextDifferentShape,
	});

	// Merge board with current falling shape
	const mergedBoard = getMergedBoard(board, currentShapeCells);

	// Format timer value to mm:ss
	const timer = formatTime(elapsedTime);

	// Render
	return (
		<>
			<div className='container'>
				{/* Main game area on the left */}
				<div className='game-area'>
					{gameStatus.isInHome ? (
						<Home setIsInHome={setIsInHome} />
					) : (
						<GameBoard
							board={mergedBoard}
							clearingLines={clearingLines}
							justLandedCells={justLandedCells}
						/>
					)}
				</div>

				{/* Right-side panel: stats + preview + buttons */}
				<div className='right-board'>
					<GameStats
						level={gameStats.level}
						score={gameStats.score}
						lines={gameStats.lines}
						isInHome={gameStatus.isInHome}
					/>
					<NextShapePreview
						nextShape={nextShape}
						isInHome={gameStatus.isInHome}
					/>

					{/* Show buttons if not in home */}
					{!gameStatus.isInHome && (
						<Buttons setIsPaused={setIsPaused} restartGame={restartGame} />
					)}

					{/* Show pause menu if game is paused */}
					{gameStatus.isPaused && (
						<Pause
							setIsInHome={setIsInHome}
							setIsPaused={setIsPaused}
							restartGame={restartGame}
						/>
					)}
				</div>

				{/* Game over screen */}
				{gameStatus.isGameOver && (
					<GameOver
						score={gameStats.score}
						timer={timer}
						level={gameStats.level}
						lines={gameStats.lines}
						restartGame={restartGame}
						setIsInHome={setIsInHome}
						setIsGameOver={setIsGameOver}
					/>
				)}
			</div>
		</>
	);
}

export default App;
