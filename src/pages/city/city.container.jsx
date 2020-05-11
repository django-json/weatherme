import React, { Component } from "react";
import { connect } from "react-redux";

import CityPage from "./city.component";

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
