function NextShapePreview({ nextShape }) {
	const shapeUrl = `/tetris/images/${nextShape.name}-shape.png`;

	return (
		<div className='next-shape-preview'>
			<div className='shape-text'>
				<h3>NEXT</h3>
			</div>
			<div className='shape-grid'>
				<img src={shapeUrl} className='shape-img' />
			</div>
		</div>
	);
}
export default NextShapePreview;
