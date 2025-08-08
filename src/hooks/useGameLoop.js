import { useEffect, useState } from 'react';
import {
	getMergedBoard,
	getFullLines,
	calculateScore,
	getNextDifferentShape,
} from '../utils/utils';
import { move } from '../utils/service';
import { DIRECTIONS } from '../utils/constants';
import { BOARD_HEIGHT, BOARD_WIDTH, DROP_INTERVAL } from '../utils/config';

export default function useGameLoop({
	board,
	currentShape,
	currentShapeCells,
	nextShape,
	lines,
	level,
	isLocking,
	isGameOver,
	isPaused,
	isInHome,
	setCurrentShape,
	setNextShape,
	setBoard,
	setScore,
	setLines,
	setLevel,
	setIsGameOver,
	setClearingLines,
	setJustLandedCells,
	nextShapeCells,
}) {
	const [tick, setTick] = useState(0);

	const resetTick = () => setTick(0);

	const moveDown = () => {
		if (isGameOver || isLocking.current) return;

		isLocking.current = true;

		let result;
		try {
			result = move(board, currentShape, currentShapeCells, DIRECTIONS.DOWN);
			if (result) {
				setCurrentShape(result);
				isLocking.current = false;
				return;
			}
		} catch {
			// Shape landed
			setJustLandedCells(currentShapeCells);
			setTimeout(() => setJustLandedCells([]), 300);

			const newBoard = getMergedBoard(board, currentShapeCells);
			const fullLines = getFullLines(newBoard);

			if (fullLines.length > 0) {
				setClearingLines(fullLines);

				const linesCleared = fullLines.length;

				setScore(prev => prev + calculateScore(linesCleared, level));
				setLines(prev => prev + linesCleared);

				if (lines + linesCleared >= level * 10) {
					setLevel(prev => prev + 1);
				}

				setTimeout(() => {
					let cleared = newBoard.filter((_, i) => !fullLines.includes(i));
					while (cleared.length < BOARD_HEIGHT) {
						cleared.unshift(Array(BOARD_WIDTH).fill(0));
					}

					const overlaps = nextShapeCells.some(({ i, j }) => {
						return (
							i >= 0 &&
							i < BOARD_HEIGHT &&
							j >= 0 &&
							j < BOARD_WIDTH &&
							cleared[i][j]
						);
					});

					setClearingLines([]);
					setBoard(cleared);
					setCurrentShape(nextShape);
					setNextShape(getNextDifferentShape(nextShape));

					if (overlaps) {
						setIsGameOver(true);
					}
					isLocking.current = false;
				}, 300);
				return;
			}

			const overlaps = nextShapeCells.some(({ i, j }) => {
				return (
					i >= 0 &&
					i < BOARD_HEIGHT &&
					j >= 0 &&
					j < BOARD_WIDTH &&
					newBoard[i][j]
				);
			});

			setBoard(newBoard);
			setCurrentShape(nextShape);
			setNextShape(getNextDifferentShape(nextShape));

			if (overlaps) setIsGameOver(true);
			isLocking.current = false;
		}
	};

	useEffect(() => {
		if (isGameOver || isPaused || isInHome) return;

		moveDown();

		const timeout = setTimeout(() => {
			setTick(prev => prev + 1);
		}, DROP_INTERVAL);

		return () => clearTimeout(timeout);
	}, [tick, isPaused, isInHome, isGameOver]);

	return { resetTick }; // ← expose it
}
