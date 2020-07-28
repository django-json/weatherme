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

export const getYear = (datetime) => {
	return new Date(datetime * 1000).getFullYear();
};

export const getMonth = (datetime) => {
	return new Date(datetime * 1000).getMonth();
};

export const getDate = (datetime) => {
	return new Date(datetime * 1000).getDate();
};

export const setDate = (reading) => {
	let newDate = new Date();
	const weekDay = reading.dt * 1000;
	/*Set Day*/
	newDate.setTime(weekDay);

	return newDate;
};

export const addDay = (date, numOfDay) => {
	//Intatiating a new date with the date passed to the parameter to avoid modifying the actual date object when adding day(s) to the given date.
	let newReferenceDate = new Date(date);
	newReferenceDate.setDate(newReferenceDate.getDate() + numOfDay);
	return newReferenceDate;
};

export const addHour = (date, numOfHours) => {
	let newReferenceDate = new Date(date);
	return newReferenceDate.setHours(newReferenceDate.getHours() + numOfHours);
};

export const getIndexOf = (array, value) => {
	return array.indexOf(value);
};

export const convertDateToDatetime = (date) => {
	return date / 1000;
};

export const resetDateToMidnight = (date) => {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const isGreaterThan = (firstValue, secondValue) => {
	if (firstValue > secondValue) {
		return true;
	}
	return false;
};

export const isEqual = (firstValue, secondValue) => {
	if (firstValue === secondValue) {
		return true;
	}
	return false;
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
