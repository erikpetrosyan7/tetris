import React from 'react';

const GameBoard = ({ board, clearingLines, justLandedCells }) => {
	return (
		<div className='play-area'>
			{board.map((row, i) => (
				<div
					className={`row ${clearingLines.includes(i) ? 'clearing' : ''}`}
					key={i}
				>
					{row.map((cell, j) => {
						const isLanded = justLandedCells.some(c => c.i === i && c.j === j);

						return (
							<div
								className={`cell ${cell ? 'marked' : ''} ${
									isLanded ? 'just-landed' : ''
								}`}
								key={j}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default React.memo(GameBoard);
