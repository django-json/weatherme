import React from 'react';

import './city-weather.styles.scss';

import DegreeToggle from '../../components/degree-toggle/degree-toggle.component';
import DayCard from '../../components/day-card/day-card.component';

const CityWeatherPage = () => (
	<div className="city-weather-page">
		<h2>CITY NAME</h2>
		<DegreeToggle />
		<div className="day-cards">
			<DayCard />
			<DayCard />
			<DayCard />
			<DayCard />
			<DayCard />
		</div>
	</div>
);

export default CityWeatherPage;