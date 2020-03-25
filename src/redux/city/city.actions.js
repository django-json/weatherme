import { CityActionTypes } from './city.types';

export const setCity = (city) => ({
	type: CityActionTypes.SET_CITY,
	payload: city
});