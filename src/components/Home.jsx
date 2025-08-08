import FloatingShape from './FloatingShape';

function Home({ setIsInHome }) {
	return (
		<div className='home'>
			<h1 className='home-title'>TETRIS</h1>
			<FloatingShape />
			<p className='home-description'>
				Welcome to the game! Stack the blocks, clear lines, and aim for the high
				score.
			</p>

			<button className='play-button' onClick={() => setIsInHome(false)}>
				PLAY
			</button>
			<div className='home-controls'>
				<h3>Controls:</h3>
				<ul>
					<li>← / → : Move</li>
					<li>↓ : Soft Drop</li>
					<li>↑ : Rotate</li>

					<li>Space : Hard Drop</li>
				</ul>
			</div>
		</div>
	);
}
export default Home;
