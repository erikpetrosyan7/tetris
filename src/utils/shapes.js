const SHAPES = [
	{
		name: 'L',
		matrix: [
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 1],
		],
		position: { i: 0, j: 3 },
	},
	{
		name: 'J',
		matrix: [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 0],
		],
		position: { i: 0, j: 4 },
	},
	{
		name: 'O',
		matrix: [
			[1, 1],
			[1, 1],
		],
		position: { i: 0, j: 4 },
	},
	{
		name: 'S',
		matrix: [
			[0, 0, 0],
			[0, 1, 1],
			[1, 1, 0],
		],
		position: { i: -1, j: 3 },
	},
	{
		name: 'Z',
		matrix: [
			[0, 0, 0],
			[1, 1, 0],
			[0, 1, 1],
		],
		position: { i: -1, j: 3 },
	},
	{
		name: 'I',
		matrix: [
			[0, 0, 0, 0],
			[1, 1, 1, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		position: { i: -1, j: 3 },
	},
	{
		name: 'T',
		matrix: [
			[0, 0, 0],
			[0, 1, 0],
			[1, 1, 1],
		],
		position: { i: -1, j: 3 },
	},
];

export default function getRandomShape() {
	const randomIndex = Math.floor(Math.random() * SHAPES.length);
	const shape = SHAPES[randomIndex];
	return {
		name: shape.name,
		matrix: shape.matrix.map(row => [...row]),
		position: { ...shape.position },
		img: shape.img,
	};
}
