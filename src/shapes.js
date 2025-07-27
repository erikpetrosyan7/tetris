const SHAPES = [
	{
		name: 'L',
		matrix: [
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 1],
		],
		position: { i: 0, j: 3 },
		img: '/tetris/images/blue.png',
	},
	{
		name: 'J',
		matrix: [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 0],
		],
		position: { i: 0, j: 4 },
		img: '/tetris/images/orange.png',
	},
	{
		name: 'O',
		matrix: [
			[1, 1],
			[1, 1],
		],
		position: { i: 0, j: 4 },
		img: '/tetris/images/yellow.png',
	},
	{
		name: 'S',
		matrix: [
			[0, 0, 0],
			[0, 1, 1],
			[1, 1, 0],
		],
		position: { i: -1, j: 3 },
		img: '/tetris/images/green.png',
	},
	{
		name: 'Z',
		matrix: [
			[0, 0, 0],
			[1, 1, 0],
			[0, 1, 1],
		],
		position: { i: -1, j: 3 },
		img: '/tetris/images/red.png',
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
		img: '/tetris/images/cyan.png',
	},
	{
		name: 'T',
		matrix: [
			[0, 0, 0],
			[0, 1, 0],
			[1, 1, 1],
		],
		position: { i: -1, j: 3 },
		img: '/tetris/images/purple.png',
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
