import React, { Component } from "react";
import { connect } from "react-redux";

import CityPage from "./city.component";

import { selectDailyReading } from "../../redux/weather/weather.selectors";

class CityContainer extends Component {
	render() {
		const { cities } = this.props;
		return <CityPage cities={cities} />;
	}
}

const mapStateToProps = (state) => ({
	cities: state.city.cities,
});

export default connect(mapStateToProps)(CityContainer);
