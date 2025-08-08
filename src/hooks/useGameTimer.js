// hooks/useGameTimer.js
import { useEffect, useState } from 'react';

export default function useGameTimer({ isRunning, isInHome }) {
	const [startTime, setStartTime] = useState(null);
	const [elapsedTime, setElapsedTime] = useState(0);

	// Set start time when game starts
	useEffect(() => {
		if (isRunning && !isInHome && !startTime) {
			setStartTime(Date.now());
		}
	}, [isRunning, isInHome, startTime]);

	// Update elapsed time every second
	useEffect(() => {
		let interval = null;

		if (isRunning && !isInHome && startTime) {
			interval = setInterval(() => {
				const now = Date.now();
				const diff = Math.floor((now - startTime) / 1000);
				setElapsedTime(diff);
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isRunning, isInHome, startTime]);

	// Reset timer (for restarting game)
	const resetTimer = () => {
		setStartTime(null);
		setElapsedTime(0);
	};

	return { elapsedTime, resetTimer };
}
