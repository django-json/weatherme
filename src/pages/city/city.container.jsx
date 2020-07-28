import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CityPage from "./city.component";

import { deleteCity } from "../../redux/city/city.actions";
import { fetchDailyReadingForUpdateStart } from "../../redux/weather/weather.actions";

import {
	selectCities,
	selectIsCitiesLoaded,
} from "../../redux/city/city.selectors";

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
		console.log("Updating Weather Data");
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
			if (index + 1 === cities[0].reading.length) {
				console.log("I am the last item on the `cities` list");
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

		const { deleteCity } = this.props;
		deleteCity(cityID);
	}

	handleCaretToggle(event) {
		this.setState({ toggleCaret: !this.state.toggleCaret });
	}

	render() {
		const { isCitiesLoaded } = this.props;

		return (
			<CityPage
				handleDeleteCity={this.handleDeleteCity}
				handleCaretToggle={this.handleCaretToggle}
				refreshWeather={this.refreshWeather}
				isCitiesLoaded={isCitiesLoaded}
				cities={this.setTomorrowsWeather()}
			/>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	cities: selectCities,
	isCitiesLoaded: selectIsCitiesLoaded,
});

const mapDispatchToProps = (dispatch) => ({
	deleteCity: (id) => dispatch(deleteCity(id)),
	fetchDailyReadingForUpdateStart: (cityID) =>
		dispatch(fetchDailyReadingForUpdateStart(cityID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CityContainer);
