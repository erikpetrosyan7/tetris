function Buttons({ setIsPaused, restartGame }) {
	return (
		<div className='buttons'>
			<button onClick={() => setIsPaused(true)}>
				<p>PAUSE</p>
			</button>
			<button onClick={restartGame}>
				<p>RESTART</p>
			</button>
		</div>
	);
}
export default Buttons;
