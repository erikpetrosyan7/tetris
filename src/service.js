import { DIRECTIONS } from './constants';
import {
	validateBoard,
	validateRotation,
	validateDownMove,
	validateLeftMove,
	validateRightMove,
	validateShape,
} from './validations';
import { getShapeCells } from './App';

export const move = (board, shape, shapeCells, direction) => {
	validateBoard(board);
	validateShape(shapeCells);

	let newPosition = { ...shape.position };

	if (direction === DIRECTIONS.UP) {
		const rotatedMatrix = shape.matrix[0].map((_, colIndex) =>
			shape.matrix.map(row => row[colIndex]).reverse()
		);

		const rotatedShapeCells = getShapeCells({
			matrix: rotatedMatrix,
			position: shape.position,
		});

		validateRotation(board, rotatedShapeCells);

		return {
			...shape,
			matrix: rotatedMatrix,
		};
	}

	if (direction === DIRECTIONS.LEFT) {
		validateLeftMove(board, shapeCells);
		newPosition = {
			i: shape.position.i,
			j: shape.position.j - 1,
		};
	}

	if (direction === DIRECTIONS.RIGHT) {
		validateRightMove(board, shapeCells);
		newPosition = {
			i: shape.position.i,
			j: shape.position.j + 1,
		};
	}

	if (direction === DIRECTIONS.DOWN) {
		validateDownMove(board, shapeCells);
		newPosition = {
			i: shape.position.i + 1,
			j: shape.position.j,
		};
	}

	return {
		...shape,
		position: newPosition,
	};
};
