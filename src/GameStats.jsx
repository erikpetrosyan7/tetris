function GameStats({ level, score, lines }) {
	return (
		<div className='game-stats'>
			<div className='score-grid'>
				<div className='score-text'>
					<h3>SCORE</h3>
				</div>
				<div className='score-number'>
					<p>{score}</p>
				</div>
			</div>
			<div className='level-board'>
				<div className='level-text'>
					<h3>LEVEL</h3>
				</div>
				<div className='level-number'>
					<p>{level}</p>
				</div>
			</div>

			<div className='lines-grid'>
				<div className='lines-text'>
					<h3>LINES</h3>
				</div>
				<div className='lines-number'>
					<p>{lines}</p>
				</div>
			</div>
		</div>
	);
}
export default GameStats;
