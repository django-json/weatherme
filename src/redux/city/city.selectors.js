import { createSelector } from "reselect";

const selectCity = (state) => state.city;

export const selectIsFetchingCity = createSelector(
	[selectCity],
	(city) => city.isFetchingCity
);
