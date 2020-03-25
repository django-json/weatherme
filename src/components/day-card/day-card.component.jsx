import React, { useState } from 'react';
import moment from 'moment';

import './day-card.styles.scss';

import DayCardModal from '../day-card-modal/day-card-modal.component';

// import { setDate } from '../../api/open-weather.utils';

const DayCard = ({ reading, degreeUnit }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isGenerated, setIsGenerated] = useState(false);

	const openModal = () => {
		setModalIsOpen(true);	
	};

	const closeModal = () => {
		setModalIsOpen(false);
		setIsGenerated(false);
	};

	const setDate = () => {
		let newDate = new Date();
		const weekDay = reading.dt * 1000;
		/*Set Day*/
		newDate.setTime(weekDay);

		return newDate;
	};

	/*Image URL*/
	const imgURL = `http://openweathermap.org/img/w/${reading.weather[0].icon}.png`;

	const formatReading = () => {
		return {
			date: setDate(), 
			imgURL: imgURL, 
			temperature: {
				current: setTemperature(degreeUnit, reading.main.temp),
				min: setTemperature(degreeUnit, reading.main.temp_min),
				max: setTemperature(degreeUnit, reading.main.temp_max),
				description: reading.weather[0].description
			},
			humidity: reading.main.humidity,
			wind: reading.wind
		}
	};

	const setTemperature = (unit, value) => {
		return unit === "fahrenheit" ?
			Math.round(value) + "°F" 
		: 	Math.round((value - 32) * 5/9) + "°C";
	}

	return (
		<div className="day-card">
			<div className="card-content" onClick={openModal}>
				<h3 className="content-day">{moment(setDate()).format('dddd')}</h3>
				<p className="content-datetime">{moment(setDate()).format('MMMM Do, h:mm a')}</p>
				<img className="content-weathericon" src={imgURL} alt="weather icon" />
				<p className="content-temperature">{setTemperature(degreeUnit, reading.main.temp)}</p>
				<p className="content-description">{reading.weather[0].description}</p>
			</div>
			<DayCardModal 
				isOpen={modalIsOpen}
				isGenerated={isGenerated}
				setIsGenerated={setIsGenerated}
				closeModal={closeModal}
				contentLabel="Day Card Modal"
				reading={formatReading()}
			/>
		</div>
	);
}

export default DayCard;