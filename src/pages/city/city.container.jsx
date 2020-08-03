import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CityPage from "./city.component";

import { deleteCity } from "../../redux/city/city.actions";
import {
	fetchDailyReadingForUpdateStart,
	resetTimeRefreshed,
} from "../../redux/weather/weather.actions";

import {
	selectCities,
	selectIsCitiesLoaded,
} from "../../redux/city/city.selectors";
import { selectTimeRefreshed } from "../../redux/weather/weather.selectors";

import {
	getIndexOf,
	convertDateToDatetime,
	addHour,
	addDay,
	resetDateToMidnight,
} from "../../utils/utils";

class CityContainer extends Component {
	constructor() {
		super();

		this.state = {
			toggleCaret: false,
		};

		this.handleDeleteCity = this.handleDeleteCity.bind(this);
		this.handleCaretToggle = this.handleCaretToggle.bind(this);
		this.setTomorrowsWeather = this.setTomorrowsWeather.bind(this);
		this.refreshWeather = this.refreshWeather.bind(this);
	}

	refreshWeather() {
		const { cities, fetchDailyReadingForUpdateStart } = this.props;

		const cityIDs = cities.map((cityObj) => cityObj.city.id);
		fetchDailyReadingForUpdateStart(cityIDs);
	}

	setTomorrowsWeather() {
		const { cities } = this.props;

		if (cities.length > 0) {
			const systemDate = resetDateToMidnight(new Date());
			//Finding the tomorrow's weather data using tomorrow's datetime.
			const datetimeTomorrow = convertDateToDatetime(
				addHour(addDay(systemDate, 1), 5)
			);

			//Get the index of the next item
			//To check if the currently rendered item is the last one
			let index = getIndexOf(
				cities[0].reading.map((item) => item.dt),
				datetimeTomorrow
			);

			// If the last item is rendered, then automatically request an updated weather data from the weather api to get a new list of weather data.
			//Or if the index is equal to -1 as the day the user use the app again has the day the last weather data item's day has which when getting the index of a specific item it found nothing.
			if (index === -1 || index + 1 === cities[0].reading.length) {
				this.refreshWeather();
			}

			return cities.map((cityObj) => {
				const foundReading = cityObj.reading.find(
					(dayReading) => dayReading.dt === datetimeTomorrow
				);
				return {
					city: cityObj.city,
					reading: foundReading,
				};
			});
		}

		return [];
	}

	handleDeleteCity(event, cityID) {
		//This will stop the bubbling process of an event from child to parent element.
		event.stopPropagation();

		const { deleteCity, cities, resetTimeRefreshed } = this.props;
		deleteCity(cityID);

		if (cities.length === 1) resetTimeRefreshed();
	}

	handleCaretToggle(event) {
		this.setState({ toggleCaret: !this.state.toggleCaret });
	}

	render() {
		const { isCitiesLoaded, timeRefreshed } = this.props;

		return (
			<CityPage
				handleDeleteCity={this.handleDeleteCity}
				handleCaretToggle={this.handleCaretToggle}
				refreshWeather={this.refreshWeather}
				timeRefreshed={timeRefreshed}
				isCitiesLoaded={isCitiesLoaded}
				cities={this.setTomorrowsWeather()}
			/>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	cities: selectCities,
	isCitiesLoaded: selectIsCitiesLoaded,
	timeRefreshed: selectTimeRefreshed,
});

const mapDispatchToProps = (dispatch) => ({
	deleteCity: (id) => dispatch(deleteCity(id)),
	fetchDailyReadingForUpdateStart: (cityID) =>
		dispatch(fetchDailyReadingForUpdateStart(cityID)),
	resetTimeRefreshed: () => dispatch(resetTimeRefreshed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CityContainer);
