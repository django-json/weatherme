import { createSelector } from 'reselect';

const selectWeather = state => state.weather;

export const selectDailyReading = createSelector(
	[selectWeather],
	weather => weather.dailyReading
);

export const selectIsWeatherFetching = createSelector(
	[selectWeather],
	weather => weather.isFetching
);

export const selectIsWeatherLoaded = createSelector(
	[selectDailyReading],
	dailyReading => !!dailyReading
);