import { useState } from 'react';

export function useGameStatus() {
	const [gameStatus, setGameStatus] = useState({
		isGameOver: false,
		isPaused: false,
		isInHome: true,
	});

	const setIsGameOver = value =>
		setGameStatus(prev => ({ ...prev, isGameOver: value }));

	const setIsPaused = value =>
		setGameStatus(prev => ({ ...prev, isPaused: value }));

	const setIsInHome = value =>
		setGameStatus(prev => ({ ...prev, isInHome: value }));

	return { gameStatus, setGameStatus, setIsGameOver, setIsPaused, setIsInHome };
}
