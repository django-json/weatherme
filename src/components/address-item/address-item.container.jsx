import React, { Component } from "react";
import { connect } from "react-redux";

import AddressItem from "./address-item.component";

import { setCity } from "../../redux/city/city.actions";
import { fetchDailyReadingStartAsync } from "../../redux/weather/weather.actions";

class AddressItemContainer extends Component {
	componentDidUpdate() {
		const { fetchDailyReadingStartAsync, city } = this.props;

		if (city) {
			fetchDailyReadingStartAsync(city);
		}
	}

	render() {
		const { setCity, cityName } = this.props;

		return <AddressItem cityName={cityName} setCity={setCity} />;
	}
}

const mapStateToProps = (state) => ({
	city: state.city.city,
});

const mapDispatchToProps = (dispatch) => ({
	setCity: (value) => dispatch(setCity(value)),
	fetchDailyReadingStartAsync: (city) =>
		dispatch(fetchDailyReadingStartAsync(city)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddressItemContainer);
