import { createSelector } from "reselect";

const selectCity = (state) => state.city;

export const selectIsFetchingCity = createSelector(
	[selectCity],
	(city) => city.isFetchingCity
);

export const selectCitySearchResults = createSelector(
	[selectCity],
	(city) => city.citySearchResults
);

export const selectIsCitySearchResultsLoaded = createSelector(
	[selectCitySearchResults],
	(citySearchResults) => !!citySearchResults
);

export const selectNewAddedCity = createSelector(
	[selectCity],
	(city) => city.city
);
