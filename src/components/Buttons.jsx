function Buttons({ setIsPaused, restartGame }) {
	return (
		<div className='buttons'>
			<button onClick={() => setIsPaused(true)}>
				<p>PAUSE</p>
			</button>
			<button
				onClick={e => {
					restartGame();
					e.currentTarget.blur();
				}}
			>
				<p>RESTART</p>
			</button>
		</div>
	);
}
export default Buttons;
