import React from 'react';

import './degree-toggle.styles.scss';

const DegreeToggle = () => (
	<div className="degree-toggle">
		
		<label className="container">Celsius
			<input type="radio" id="celsius" name="degree" value="celsius"/>
			<span className="checkmark" />
		</label>

		<label className="container">Fahrenheit
			<input type="radio" id="fahrenheit" name="degree" value="fahrenheit"/>
			<span className="checkmark" />
		</label>
	</div>
);

export default DegreeToggle;