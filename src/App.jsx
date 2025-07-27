import { useEffect, useRef, useState } from 'react';
import './App.scss';
import { move } from './service';
import { DIRECTIONS } from './constants';
import getRandomShape from './shapes';
import NextShapePreview from './NextShapePreview';
import GameStats from './GameStats';
import GameOver from './GameOver';

const width = 10;
const height = 20;

export function getShapeCells(shape) {
	if (!shape || !shape.matrix) return [];
	const cells = [];
	shape.matrix.forEach((row, i) => {
		row.forEach((value, j) => {
			if (value === 1) {
				cells.push({ i: shape.position.i + i, j: shape.position.j + j });
			}
		});
	});
	return cells;
}

function getMergedBoard(board, currentShape, shape) {
	if (!Array.isArray(shape) || shape.length === 0) return board;
	const merged = board.map(row => [...row]);
	shape.forEach(({ i, j }) => {
		if (i >= 0 && i < height && j >= 0 && j < width) {
			merged[i][j] = currentShape.img;
		}
	});
	return merged;
}

function getNextDifferentShape(current) {
	let newShape;
	do {
		newShape = getRandomShape();
	} while (newShape.name === current.name);
	return newShape;
}

function getFullLines(board) {
	return board.reduce((full, row, i) => {
		if (row.every(cell => cell !== 0)) full.push(i);
		return full;
	}, []);
}

function calculateScore(linesCleared, level) {
	switch (linesCleared) {
		case 1:
			return 40 * level;
		case 2:
			return 100 * level;
		case 3:
			return 300 * level;
		case 4:
			return 1200 * level;
		default:
			return 0;
	}
}

const formatTime = seconds => {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

function App() {
	const [isGameOver, setIsGameOver] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [clearingLines, setClearingLines] = useState([]);
	const [level, setLevel] = useState(1);
	const [score, setScore] = useState(0);
	const [lines, setLines] = useState(0);

	// timer
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [elapsedTime, setElapsedTime] = useState(0);

	const isLocking = useRef(false);

	const [currentShape, setCurrentShape] = useState(() => getRandomShape());

	const [nextShape, setNextShape] = useState(() =>
		getNextDifferentShape(currentShape)
	);

	const [goDownSteps, setGoDownSteps] = useState(0);

	const [board, setBoard] = useState(() =>
		Array(height)
			.fill(null)
			.map(() => Array(width).fill(0))
	);

	// Timer logic
	useEffect(() => {
		if (!startTime) {
			setStartTime(Date.now());
		}
	}, []);

	useEffect(() => {
		if (isGameOver && startTime) {
			setEndTime(Date.now());
		}
	}, [isGameOver, startTime]);

	useEffect(() => {
		if (endTime && startTime) {
			const diff = Math.floor((endTime - startTime) / 1000); // in seconds
			setElapsedTime(diff);
		}
	}, [endTime]);

	// Handle key events for moving shapes
	useEffect(() => {
		const handleKeyDown = ({ key }) => {
			if (isGameOver) return;

			let result;

			if (key === 'ArrowUp') {
				result = move(
					board,
					currentShape,
					getShapeCells(currentShape),
					DIRECTIONS.UP
				);
			} else if (key === 'ArrowLeft') {
				result = move(
					board,
					currentShape,
					getShapeCells(currentShape),
					DIRECTIONS.LEFT
				);
			} else if (key === 'ArrowRight') {
				result = move(
					board,
					currentShape,
					getShapeCells(currentShape),
					DIRECTIONS.RIGHT
				);
			} else if (key === 'ArrowDown') {
				result = move(
					board,
					currentShape,
					getShapeCells(currentShape),
					DIRECTIONS.DOWN
				);
			} else {
				return;
			}

			if (result) {
				setCurrentShape(result);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [board, currentShape, isGameOver]);

	const moveDown = () => {
		if (isGameOver || isLocking.current) return;

		isLocking.current = true;

		let result;
		try {
			result = move(
				board,
				currentShape,
				getShapeCells(currentShape),
				DIRECTIONS.DOWN
			);
			if (result) {
				setCurrentShape(result);
				isLocking.current = false;
				return;
			}
		} catch {
			const newBoard = getMergedBoard(
				board,
				currentShape,
				getShapeCells(currentShape)
			);
			const fullLines = getFullLines(newBoard);

			if (fullLines.length > 0) {
				setClearingLines(fullLines);

				const linesCleared = fullLines.length;

				setScore(prev => prev + calculateScore(linesCleared, level));
				setLines(prev => prev + linesCleared);
				if (lines === 10) {
					setLevel(prev => prev + 1);
				}
				setTimeout(() => {
					let cleared = newBoard.filter((_, i) => !fullLines.includes(i));
					while (cleared.length < height) {
						cleared.unshift(Array(width).fill(0));
					}

					const newNextShape = getNextDifferentShape(nextShape);
					const nextShapeCells = getShapeCells(nextShape);
					const overlaps = nextShapeCells.some(({ i, j }) => {
						return i >= 0 && i < height && j >= 0 && j < width && cleared[i][j];
					});

					setClearingLines([]);
					setBoard(cleared);
					setCurrentShape(nextShape);
					setNextShape(newNextShape);

					if (overlaps) {
						setIsGameOver(true);
					}
					isLocking.current = false;
				}, 300);
				return;
			}

			const clearedBoard = newBoard;
			const nextShapeCells = getShapeCells(nextShape);
			const overlaps = nextShapeCells.some(({ i, j }) => {
				return (
					i >= 0 && i < height && j >= 0 && j < width && clearedBoard[i][j]
				);
			});
			const newNextShape = getNextDifferentShape(nextShape);

			setBoard(clearedBoard);
			setCurrentShape(nextShape);
			setNextShape(newNextShape);

			if (overlaps) setIsGameOver(true);

			isLocking.current = false;
		}
	};

	useEffect(() => {
		if (isGameOver || isPaused) return;

		moveDown();

		const timeout = setTimeout(() => {
			setGoDownSteps(prev => prev + 1);
		}, 500);

		return () => clearTimeout(timeout);
	}, [goDownSteps, isPaused, isGameOver]);

	const mergedBoard = getMergedBoard(
		board,
		currentShape,
		getShapeCells(currentShape)
	);
	const timer = formatTime(elapsedTime);

	return (
		<div className='container'>
			<div className='play-area'>
				{isGameOver && (
					<GameOver score={score} timer={timer} level={level} lines={lines} />
				)}
				{mergedBoard.map((row, i) => (
					<div
						className={`row ${clearingLines.includes(i) ? 'clearing' : ''}`}
						key={i}
					>
						{row.map((cell, j) => (
							<div className='cell' key={j}>
								{cell && <img src={cell} alt='block' className='shape-img' />}
							</div>
						))}
					</div>
				))}
			</div>

			<div className='right-board'>
				<img
					onClick={() => setIsPaused(true)}
					className='pause'
					src='/tetris/images/pause.png'
					alt='pause-button'
				/>
				{isPaused && (
					<div>
						<div className='pause-background'> </div>
						<div className='pause-popup'>
							<h3>PAUSED</h3>
							<div className='resume-button' onClick={() => setIsPaused(false)}>
								<p>RESUME</p>
							</div>
							<div className='quit-button'>
								<p>QUIT</p>
							</div>
						</div>
					</div>
				)}
				<NextShapePreview nextShape={nextShape} />
				<GameStats level={level} score={score} lines={lines} />
			</div>
		</div>
	);
}

export default App;
