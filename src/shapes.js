const SHAPES = [
	{
		name: 'L',
		matrix: [
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 1],
		],
		position: { i: 0, j: 3 },
		img: '/images/blue.png',
	},
	{
		name: 'J',
		matrix: [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 0],
		],
		position: { i: 0, j: 4 },
		img: '/images/orange.png',
	},
	{
		name: 'O',
		matrix: [
			[1, 1],
			[1, 1],
		],
		position: { i: 0, j: 4 },
		img: '/images/yellow.png',
	},
	{
		name: 'S',
		matrix: [
			[0, 0, 0],
			[0, 1, 1],
			[1, 1, 0],
		],
		position: { i: -1, j: 3 },
		img: '/images/green.png',
	},
	{
		name: 'Z',
		matrix: [
			[0, 0, 0],
			[1, 1, 0],
			[0, 1, 1],
		],
		position: { i: -1, j: 3 },
		img: '/images/red.png',
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
		img: '/images/cyan.png',
	},
	{
		name: 'T',
		matrix: [
			[0, 0, 0],
			[0, 1, 0],
			[1, 1, 1],
		],
		position: { i: -1, j: 3 },
		img: '/images/purple.png',
	},
];

export default function getRandomShape() {
	const randomIndex = Math.floor(Math.random() * SHAPES.length);
	const shape = SHAPES[randomIndex];
	return {
		name: shape.name,
		matrix: shape.matrix.map(row => [...row]), // создаём копию матрицы
		position: { ...shape.position }, // создаём копию позиции
		img: shape.img,
	};
}
