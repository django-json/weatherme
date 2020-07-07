import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CityPage from "./city.component";

import { deleteCity } from "../../redux/city/city.actions";
import { fetchDailyReadingStart } from "../../redux/weather/weather.actions";

import {
	selectCities,
	selectIsCitiesLoaded,
} from "../../redux/city/city.selectors";

import {
	getIndexOf,
	convertDateToDatetime,
	addHourToDate,
	addDaytoDate,
	resetDateToMidnight,
} from "../../utils/utils";

class CityContainer extends Component {
	constructor() {
		super();

		this.state = {
			toggleCaret: false,
			tomorrowsWeather: [],
		};

		this.handleDeleteCity = this.handleDeleteCity.bind(this);
		this.handleCaretToggle = this.handleCaretToggle.bind(this);
		this.setTomorrowsWeather = this.setTomorrowsWeather.bind(this);
	}

	componentDidMount() {
		// const { cities, fetchDailyReadingStart } = this.props;
		// if (cities.length > 0) {
		// 	const systemDate = resetDateToMidnight(new Date());
		// 	//Get the index of the next weather data item
		// 	//Then get and update the display of the tomorrows weather forecast from the `cities` array with respect to date today using the index.
		// 	const index = getIndexOf(
		// 		cities[0].reading.map((item) => item.dt),
		// 		convertDateToDatetime(
		// 			addHourToDate(incrementDateByOne(systemDate), 2)
		// 		)
		// 	);
		// 	const tomorrowsWeather = cities.map((cityObj) => {
		// 		return { city: cityObj.city, reading: cityObj.reading[index] };
		// 	});
		// 	this.setState({ tomorrowsWeather });
		// }
		// // If the last item is rendered, then automatically request an updated data from the weather api to get a new list of weather data.
		// // Consider to add a refresh button above the city list for the user to choose whether to refresh the data displayed on the city-weather page to its updated state.
	}

	setTomorrowsWeather() {
		const { cities } = this.props;

		if (cities.length > 0) {
			const systemDate = resetDateToMidnight(new Date());

			//Get the index of the next weather data item
			//Then get and update the display of the tomorrows weather forecast from the `cities` array with respect to date today using the index.
			const index = getIndexOf(
				cities[0].reading.map((item) => item.dt),
				convertDateToDatetime(
					addHourToDate(addDaytoDate(systemDate, 1), 2)
				)
			);

			const tomorrowsWeather = cities.map((cityObj) => {
				return { city: cityObj.city, reading: cityObj.reading[index] };
			});

			return tomorrowsWeather;
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
	fetchDailyReadingStart: (cityID) =>
		dispatch(fetchDailyReadingStart(cityID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CityContainer);
