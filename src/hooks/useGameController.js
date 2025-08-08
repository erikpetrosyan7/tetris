import { BOARD_WIDTH, BOARD_HEIGHT } from '../utils/config';

import getRandomShape from '../utils/shapes';
import { getNextDifferentShape } from '../utils/utils';


export default function useGameController({
	setGameStatus,
	setGameStats,
	setClearingLines,
	setCurrentShape,
	setNextShape,
	setBoard,
	resetTimer,
	resetTick,
	isLockingRef,
}) {
	const restartGame = () => {
		isLockingRef.current = false;

		setGameStatus({
			isGameOver: false,
			isPaused: false,
			isInHome: false,
		});

		setClearingLines([]);
		setGameStats({
			score: 0,
			lines: 0,
			level: 1,
		});

		resetTimer();

		const newCurrentShape = getRandomShape();
		setCurrentShape(newCurrentShape);
		setNextShape(getNextDifferentShape(newCurrentShape));
		resetTick();

		setBoard(
			Array(BOARD_HEIGHT)
				.fill(null)
				.map(() => Array(BOARD_WIDTH).fill(0))
		);
	};

	return { restartGame };
}
