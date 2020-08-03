export const formatCitySearchResults = (data) => {
	return data._embedded["city:search-results"].map((result) => ({
		name: result.matching_full_name,
		id: result._links["city:item"].href.split("/")[5].split(":")[1],
	}));
};

export const removeCity = (cities, id) => {
	return cities.filter((cityObj) => cityObj.city.id !== id);
};

//Get the index of the city in the `cities` array using the city id from the updatedCityData.
//Use the index to manipulate that specific item/element to replaced the old data with the new one.

export const updateCity = (cities, updatedCityData) => {
	const cityIDs = cities.map((cityObj) => cityObj.city.id);
	const index = cityIDs.indexOf(updatedCityData.city.id);
	//Assigning the `reading` value with the updated value.
	cities[index].reading = updatedCityData.reading;

	return cities;
};
