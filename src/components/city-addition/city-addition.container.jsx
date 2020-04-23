import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CityAddition from "./city-addition.component";

import { fetchCityStartAsync } from "../../redux/city/city.actions";

import { selectIsFetchingCity } from "../../redux/city/city.selectors";

class CityAdditionContainer extends Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
			city: "",
		};

		this.onHandleAddCity = this.onHandleAddCity.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
	}

	onHandleAddCity() {
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

		const { fetchCityStartAsync } = this.props;
		const { city } = this.state;

		//This condition makes sure that the city value is not an empty string
		if (city.trim()) {
			fetchCityStartAsync(city.toLowerCase());
		}
	}

	render() {
		const { modalIsOpen, city } = this.state;
		const { isFetchingCity } = this.props;

		return (
			<CityAddition
				modalIsOpen={modalIsOpen}
				closeModal={this.closeModal}
				onHandleAddCity={this.onHandleAddCity}
				city={city}
				onSearchChange={this.onSearchChange}
				onSearchSubmit={this.onSearchSubmit}
				isFetchingCity={isFetchingCity}
			/>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isFetchingCity: selectIsFetchingCity,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCityStartAsync: (city) => dispatch(fetchCityStartAsync(city)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CityAdditionContainer);
