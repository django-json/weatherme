import React from 'react';

import './city-list-item.styles.scss';

const CityListItem = () => (
	<div className="city-list-item">
		<div className="city">
			<h4>CITY NAME</h4>
			<p>Date & Time</p>
		</div>
		<div className="city-weather">
			<p>ICON</p>
			<div className="city-weather-temp">
				<p>Current Temperature</p>
				<span>MinT</span>/
				<span>MaxT</span>
			</div>
		</div>
	</div>
);

export default CityListItem;