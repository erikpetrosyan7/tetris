import { useEffect, useState } from 'react';
import { move } from '../utils/service';
import { DIRECTIONS } from '../utils/constants';

export default function useInputHandler({
	board,
	currentShape,
	currentShapeCells,
	isGameOver,
	isPaused,
	isInHome,
	setCurrentShape,
}) {
	const [isSpacePressed, setIsSpacePressed] = useState(false);
	const [isDropping, setIsDropping] = useState(false);

	useEffect(() => {
		const handleKeyDown = ({ key }) => {
			if (isGameOver || isInHome || isPaused) return;

			let result = null;

			switch (key) {
				case 'ArrowUp':
					result = move(board, currentShape, currentShapeCells, DIRECTIONS.UP);
					break;
				case 'ArrowLeft':
					result = move(
						board,
						currentShape,
						currentShapeCells,
						DIRECTIONS.LEFT
					);
					break;
				case 'ArrowRight':
					result = move(
						board,
						currentShape,
						currentShapeCells,
						DIRECTIONS.RIGHT
					);
					break;
				case 'ArrowDown':
					result = move(
						board,
						currentShape,
						currentShapeCells,
						DIRECTIONS.DOWN
					);
					break;
				case ' ':
					if (!isSpacePressed && !isDropping) {
						setIsSpacePressed(true);
						setIsDropping(true);
						result = move(
							board,
							currentShape,
							currentShapeCells,
							DIRECTIONS.SPACE
						);
						setTimeout(() => setIsDropping(false), 50);
					}
					break;
				default:
					break;
			}

			if (result) {
				setCurrentShape(result);
			}
		};

		const handleKeyUp = ({ key }) => {
			if (key === ' ') {
				setIsSpacePressed(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [
		board,
		currentShape,
		currentShapeCells,
		isGameOver,
		isPaused,
		isInHome,
		isSpacePressed,
		isDropping,
		setCurrentShape,
		setIsSpacePressed,
		setIsDropping,
	]);
}
