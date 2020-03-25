//Returns five readings.
export const filterDailyReading = (data) => {
	const filteredData = data.list.filter(
		reading => reading.dt_txt.includes("18:00:00")
	);

	return {
		city: data.city,
		reading: filteredData
	}
};	
	