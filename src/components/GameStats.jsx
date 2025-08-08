import React from 'react';
import StatRow from './StatRow';

function GameStats({ level, score, lines, isInHome }) {
	return (
		<div className='game-stats'>
			<StatRow label='SCORE' value={score} hidden={isInHome} />
			<StatRow label='LEVEL' value={level} hidden={isInHome} />
			<StatRow label='LINES' value={lines} hidden={isInHome} />
		</div>
	);
}

export default React.memo(GameStats);
