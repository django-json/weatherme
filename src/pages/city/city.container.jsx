import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CityPage from "./city.component";

import {
	selectCities,
	selectIsCitiesLoaded,
} from "../../redux/city/city.selectors";

class CityContainer extends Component {
	render() {
		const { cities, isCitiesLoaded } = this.props;
		return <CityPage isCitiesLoaded={isCitiesLoaded} cities={cities} />;
	}
}
const mapStateToProps = createStructuredSelector({
	cities: selectCities,
	isCitiesLoaded: selectIsCitiesLoaded,
});

export default connect(mapStateToProps)(CityContainer);
