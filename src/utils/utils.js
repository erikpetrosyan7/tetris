import { BOARD_WIDTH, BOARD_HEIGHT } from './config';
import getRandomShape from './shapes';
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

export function getMergedBoard(board, shape) {
	if (!Array.isArray(shape) || shape.length === 0) return board;
	const merged = board.map(row => [...row]);
	shape.forEach(({ i, j }) => {
		if (i >= 0 && i < BOARD_HEIGHT && j >= 0 && j < BOARD_WIDTH) {
			merged[i][j] = true;
		}
	});
	return merged;
}

export function getNextDifferentShape(current) {
	let newShape;
	do {
		newShape = getRandomShape();
	} while (newShape.name === current.name);
	return newShape;
}

export function getFullLines(board) {
	return board.reduce((full, row, i) => {
		if (row.every(cell => cell !== 0)) full.push(i);
		return full;
	}, []);
}

export function calculateScore(linesCleared, level) {
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

export const formatTime = seconds => {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
