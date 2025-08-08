function Pause({ setIsPaused, setIsInHome, restartGame }) {
	return (
		<>
			<div className='pause-background'></div>
			<div className='pause-popup'>
				<h3>PAUSED</h3>
				<button className='resume-button' onClick={() => setIsPaused(false)}>
					<p>RESUME</p>
				</button>
				<button
					className='quit-button'
					onClick={() => {
						restartGame();
						setIsInHome(true);
						setIsPaused(false);
					}}
				>
					<p>QUIT</p>
				</button>
			</div>
		</>
	);
}
export default Pause;
