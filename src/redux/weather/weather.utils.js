//Returns five readings.
export const filterDailyReading = ({ forecast }) => {
	const filteredForecastData = filterForecastData(forecast);

	return {
		city: forecast.city,
		reading: filteredForecastData,
	};
};

const filterForecastData = (forecast) => {
	return forecast.list.filter((reading) =>
		reading.dt_txt.includes("21:00:00")
	);
};
