import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CityWeather from "./city-weather.component";

import {
	selectCities,
	selectIsCitiesLoaded,
} from "../../redux/city/city.selectors";

class CityWeatherContainer extends Component {
	constructor() {
		super();
		this.state = {
			degreeUnit: "celsius",
			modalIsOpen: false,
			qrcodeIsGenerated: false,
			modalID: "",
			reading: "",
		};
	}

	//Used to fix error not getting props when the app refreshes through browsers console.
	//This will allow component to render when the `reading` state gets updated with the props passed by the parent component which this parent also relying to a returned value of an asynchronous request happening in the background.

	static getDerivedStateFromProps(nextProps, prevState) {
		const foundCity = nextProps.cities.find(
			(cityObj) =>
				cityObj.city.id === Number(nextProps.match.params.cityID)
		);

		if (foundCity !== prevState.reading) {
			return {
				reading: foundCity,
			};
		}
		return null;
	}

	onDegreeUnitChange = (event) => {
		this.setState({ degreeUnit: event.target.value });
	};

	openModal = (modalID) => {
		this.setState({ modalIsOpen: true, modalID });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false, qrcodeIsGenerated: false });
	};

	setQrcodeIsGenerated = () => {
		this.setState({ qrcodeIsGenerated: true });
	};

	render() {
		const {
			reading,
			degreeUnit,
			modalIsOpen,
			qrcodeIsGenerated,
			modalID,
		} = this.state;

		const { isCitiesLoaded } = this.props;

		return (
			<CityWeather
				isCitiesLoaded={isCitiesLoaded}
				reading={reading}
				degreeUnit={degreeUnit}
				modalIsOpen={modalIsOpen}
				modalID={modalID}
				openModal={this.openModal}
				closeModal={this.closeModal}
				qrcodeIsGenerated={qrcodeIsGenerated}
				setQrcodeIsGenerated={this.setQrcodeIsGenerated}
				onDegreeUnitChange={this.onDegreeUnitChange}
			/>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	cities: selectCities,
	isCitiesLoaded: selectIsCitiesLoaded,
});

export default connect(mapStateToProps)(CityWeatherContainer);
