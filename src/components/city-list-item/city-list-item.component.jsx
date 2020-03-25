import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import './city-list-item.styles.scss';

const setDate = (datetime) => {
	let newDate = new Date();
	const weekDay = datetime * 1000;
	/*Set Day*/
	newDate.setTime(weekDay);

	return newDate;
};

const setTemperature = (value) => {
	return Math.round((value - 32) * 5/9) + "°C";
}

const CityListItem = ({ city, reading, history, match }) => {
	return (
		<div 
			className="city-list-item"
			onClick={() => history.push(`${match.path}city=${city.name}`)}
		>
			<div className="list-item-name">
				<h4>{`${city.name}, ${city.country}`}</h4>
				<p>{moment(setDate(reading[0].dt)).format('MMMM Do, h:mm a')}</p>
			</div>
			<div className="list-item-weather">
				<img src={`http://openweathermap.org/img/w/${reading[0].weather[0].icon}.png`} alt="weather icon" />
				<div className="item-weather-temp">
					<p>{setTemperature(reading[0].main.temp)}</p>
					<span>Min: {setTemperature(reading[0].main.temp_min)}</span>/
					<span>Max: {setTemperature(reading[0].main.temp_max)}</span>
				</div>
			</div>
		</div>
	);
}

export default withRouter(CityListItem);