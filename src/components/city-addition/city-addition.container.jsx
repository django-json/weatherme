import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CityAddition from "./city-addition.component";

import { fetchCityStart, toggleCaret } from "../../redux/city/city.actions";
import {
	fetchDailyReadingForAddStart,
} from "../../redux/weather/weather.actions";

import {
	selectIsFetchingCity,
	selectIsCitySearchResultsLoaded,
	selectCitySearchResults,
	selectCaretToggle,
	selectCities,
} from "../../redux/city/city.selectors";

class CityAdditionContainer extends Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
			city: "",
			error: "",
		};

		this.addCity = this.addCity.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.toggleCaretToFalse = this.toggleCaretToFalse.bind(this);
	}

	addCity(id) {
		const {
			fetchDailyReadingForAddStart,
			cities,
		} = this.props;

		//Restrict adding existing city
		if (cities.length > 0) {
			const foundDuplicateCity = cities.find(
				(cityObj) => cityObj.city.id === id
			);

			if (foundDuplicateCity === undefined) {
				// Fetching the weather data of the newly added city by city id before appending it to an array of cities in the store.
				fetchDailyReadingForAddStart(id);

				this.setState({ modalIsOpen: false });
				this.toggleCaretToFalse();
			} else {
				this.setState({ error: "City already exist!" });
			}
		} else {
			fetchDailyReadingForAddStart(id);

			this.setState({ modalIsOpen: false });
			this.toggleCaretToFalse();
		}
	}

	toggleCaretToFalse() {
		const { caretToggle } = this.props;

		if (caretToggle) {
			const { toggleCaret } = this.props;
			//reset caretToggle state to false to only display the curet without the list
			toggleCaret();
		}
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false, error: "" });
		this.toggleCaretToFalse();
	}

	onSearchChange(event) {
		const { value } = event.target;
		let error = value <= 0 ? "Please input a city" : "";

		this.setState({ city: event.target.value, error });
	}

	async onSearchSubmit(event) {
		event.preventDefault();

		const { fetchCityStart } = this.props;
		const { city } = this.state;

		//This makes sure that the city value is not an empty string
		if (city.trim()) {
			fetchCityStart(city.toLowerCase());
		} else {
			this.setState({ error: "Invalid city" });
		}
	}

	render() {
		const { modalIsOpen, city, error } = this.state;
		const {
			isFetchingCity,
			isCitySearchResultsLoaded,
			citySearchResults,
			toggleCaret,
			caretToggle,
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
				toggleCaret={toggleCaret}
				caretToggle={caretToggle}
				error={error}
			/>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isFetchingCity: selectIsFetchingCity,
	isCitySearchResultsLoaded: selectIsCitySearchResultsLoaded,
	citySearchResults: selectCitySearchResults,
	caretToggle: selectCaretToggle,
	cities: selectCities,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCityStart: (city) => dispatch(fetchCityStart(city)),
	fetchDailyReadingForAddStart: (cityID) =>
		dispatch(fetchDailyReadingForAddStart(cityID)),
	toggleCaret: () => dispatch(toggleCaret()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CityAdditionContainer);
