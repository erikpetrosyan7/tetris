export default function GameOver({ score, timer, level, lines }) {
	return (
		<div>
			<div className='game-over-background'> </div>
			<div className='game-over-popup'>
				<h3>GAME OVER</h3>
				<div className='game-over-score'>
					<h4>SCORE</h4>

					<p>{score}</p>
				</div>
				<div className='game-over-stats'>
					<div className='game-over-time'>
						<h4>TIME</h4>
						<p>{timer}</p>
					</div>
					<div className='game-over-level'>
						<h4>LEVEL</h4>
						<p>{level}</p>
					</div>
					<div className='game-over-lines'>
						<h4>LINES</h4>
						<p>{lines}</p>
					</div>
				</div>
				<div className='game-over-buttons'>
					<img src='/images/home.png' alt='home-button' />

					<img src='/images/restart.png' alt='restart-button' />
				</div>
			</div>
		</div>
	);
}
