import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './city-weather.styles.scss';

import DegreeToggle from '../../components/degree-toggle/degree-toggle.component';
import DayCard from '../../components/day-card/day-card.component';
import Spinner from '../spinner/spinner.component';

import { selectDailyReading, selectIsWeatherLoaded } from '../../redux/weather/weather.selectors';

const CityWeather = ({ reading, isLoaded }) => {
	const [ degreeUnit, setDegreeUnit ] = useState("celsius");

	const onDegreeUnitChange = (event) => {
		setDegreeUnit(event.target.value)
	};

	return isLoaded ? (
		<div className="city-weather">
			<h2>{`${reading.city.name}, ${reading.city.country}`}</h2>
			<DegreeToggle degreeUnit={degreeUnit} onDegreeUnitChange={onDegreeUnitChange}/>
			<div className="day-cards">
				{
					reading.reading.map((day, index) => (
						<DayCard key={index} degreeUnit={degreeUnit} reading={day} />
					))
				}
			</div>
		</div>
	) : ( <Spinner />)
};

const mapStateToProps = createStructuredSelector({
	reading: selectDailyReading,
	isLoaded: selectIsWeatherLoaded
});

export default connect(mapStateToProps)(CityWeather);