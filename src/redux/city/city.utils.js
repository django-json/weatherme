export const formatCitySearchResults = (data) => {
	return data._embedded["city:search-results"].map((result) => ({
		cityName: result.matching_full_name,
		cityID: result._links["city:item"].href.split("/")[5].split(":")[1],
	}));
};

export const removeCity = (cities, id) => {
	return cities.filter((cityObj) => cityObj.city.id !== id);
};
