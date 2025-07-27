function GameStats({ level, score, lines, isInHome }) {
	return (
		<div className='game-stats'>
			<div className='score-grid'>
				<div className='score-text'>
					<h3>SCORE</h3>
				</div>
				<div className='score-number'>{!isInHome && <p>{score}</p>}</div>
			</div>
			<div className='level-board'>
				<div className='level-text'>
					<h3>LEVEL</h3>
				</div>
				<div className='level-number'>
					<div className='score-number'>{!isInHome && <p>{level}</p>}</div>
				</div>
			</div>

			<div className='lines-grid'>
				<div className='lines-text'>
					<h3>LINES</h3>
				</div>
				<div className='lines-number'>
					<div className='score-number'>{!isInHome && <p>{lines}</p>}</div>
				</div>
			</div>
		</div>
	);
}
export default GameStats;
