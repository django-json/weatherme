import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CityAddition from "./city-addition.component";

import { fetchCityStart, setCity } from "../../redux/city/city.actions";
import { fetchDailyReadingStart } from "../../redux/weather/weather.actions";

import {
	selectIsFetchingCity,
	selectIsCitySearchResultsLoaded,
	selectCitySearchResults,
} from "../../redux/city/city.selectors";

import { selectDailyReading } from "../../redux/weather/weather.selectors";

class CityAdditionContainer extends Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
			city: "",
		};

		this.addCity = this.addCity.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
	}

	addCity(newCity) {
		const { fetchDailyReadingStart } = this.props;

		// Fetching the weather data of the newly added city before appending it to an array of cities in the store.
		fetchDailyReadingStart(newCity);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	onSearchChange(event) {
		this.setState({ city: event.target.value });
	}

	async onSearchSubmit(event) {
		event.preventDefault();

		const { fetchCityStart } = this.props;
		const { city } = this.state;

		//This condition makes sure that the city value is not an empty string
		if (city.trim()) {
			fetchCityStart(city.toLowerCase());
		}
	}

	render() {
		const { modalIsOpen, city } = this.state;
		const {
			isFetchingCity,
			isCitySearchResultsLoaded,
			citySearchResults,
		} = this.props;

		return (
			<CityAddition
				modalIsOpen={modalIsOpen}
				openModal={this.openModal}
				closeModal={this.closeModal}
				city={city}
				onSearchChange={this.onSearchChange}
				onSearchSubmit={this.onSearchSubmit}
				isFetchingCity={isFetchingCity}
				isCitySearchResultsLoaded={isCitySearchResultsLoaded}
				citySearchResults={citySearchResults}
				addCity={this.addCity}
			/>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isFetchingCity: selectIsFetchingCity,
	isCitySearchResultsLoaded: selectIsCitySearchResultsLoaded,
	citySearchResults: selectCitySearchResults,
	dailyReading: selectDailyReading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCityStart: (city) => dispatch(fetchCityStart(city)),
	fetchDailyReadingStart: (city) => dispatch(fetchDailyReadingStart(city)),
	setCity: (city) => dispatch(setCity(city)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CityAdditionContainer);
