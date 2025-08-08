import React from 'react';

function NextShapePreview({ nextShape, isInHome }) {
	return (
		<div className='next-shape-preview'>
			<div className='next-shape-text'>
				<h3>NEXT</h3>
			</div>
			{!isInHome &&
				nextShape.matrix.map((row, i) => (
					<div className='row' key={i}>
						{row.map((cell, j) => (
							<div className={`cell ${cell ? 'marked' : ''}`} key={j}></div>
						))}
					</div>
				))}
		</div>
	);
}
export default React.memo(NextShapePreview);
