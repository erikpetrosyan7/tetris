import React from 'react';

function StatRow({ label, value, hidden }) {
	return (
		<div className={`${label.toLowerCase()}-grid`}>
			<div className={`${label.toLowerCase()}-text`}>
				<h3>{label}</h3>
			</div>
			<div className={`${label.toLowerCase()}-number`}>
				<p className='stat-value'>{!hidden ? value : '\u00A0'}</p>
			</div>
		</div>
	);
}

export default React.memo(StatRow);
