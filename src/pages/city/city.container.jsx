import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CityPage from "./city.component";

import { deleteCity } from "../../redux/city/city.actions";

import {
	selectCities,
	selectIsCitiesLoaded,
} from "../../redux/city/city.selectors";

class CityContainer extends Component {
	constructor() {
		super();

		this.state = {
			toggleCaret: false,
		};

		this.handleDeleteCity = this.handleDeleteCity.bind(this);
		this.handleCaretToggle = this.handleCaretToggle.bind(this);
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
		const { cities, isCitiesLoaded } = this.props;
		return (
			<CityPage
				handleDeleteCity={this.handleDeleteCity}
				handleCaretToggle={this.handleCaretToggle}
				isCitiesLoaded={isCitiesLoaded}
				cities={cities}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CityContainer);
