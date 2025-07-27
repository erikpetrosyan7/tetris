function NextShapePreview({ nextShape, isInHome }) {
	const shapeUrl = `/tetris/images/${nextShape.name}-shape.png`;

	return (
		<div className='next-shape-preview'>
			<div className='shape-text'>
				<h3>NEXT</h3>
			</div>
			<div className='shape-grid'>
				{!isInHome && (
					<img src={shapeUrl} className='shape-img' alt='Next shape' />
				)}
			</div>
		</div>
	);
}
export default NextShapePreview;
