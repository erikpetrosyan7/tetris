const FloatingShape = () => {
	// L-shape example (you can change this)
	const shape = [
		[1, 0],
		[1, 1],
		[0, 1],
	];

	return (
		<div className='floating-shape'>
			{shape.map((row, rowIndex) => (
				<div className='row' key={rowIndex}>
					{row.map((cell, cellIndex) => (
						<div
							key={cellIndex}
							className={`cell ${cell === 1 ? 'marked' : ''}`}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default FloatingShape;
