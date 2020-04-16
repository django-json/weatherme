// export const setDate = (datetime) => {
// 	let newDate = new Date();
// 	const weekDay = datetime * 1000;
// 	/*Set Day*/
// 	newDate.setTime(weekDay);

// 	return newDate;
// };

// export const setTemperature = (value) => {
// 	return Math.round(((value - 32) * 5) / 9) + "°C";
// };

export const setDate = (reading) => {
	let newDate = new Date();
	const weekDay = reading.dt * 1000;
	/*Set Day*/
	newDate.setTime(weekDay);

	return newDate;
};

export const setTemperature = (unit, value) => {
	return unit === "fahrenheit"
		? Math.round(value) + "°F"
		: Math.round(((value - 32) * 5) / 9) + "°C";
};

export const getImgURL = (reading) => {
	return `http://openweathermap.org/img/w/${reading.weather[0].icon}.png`;
};

export const formatReading = (degreeUnit, reading) => {
	return {
		date: setDate(reading),
		temperature: {
			current: setTemperature(degreeUnit, reading.main.temp),
			min: setTemperature(degreeUnit, reading.main.temp_min),
			max: setTemperature(degreeUnit, reading.main.temp_max),
			description: reading.weather[0].description,
		},
		humidity: reading.main.humidity,
		wind: reading.wind,
	};
};
