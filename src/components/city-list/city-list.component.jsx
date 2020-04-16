import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./city-list.styles.scss";

import Spinner from "../spinner/spinner.component";

import CityListItem from "../city-list-item/city-list-item.component";
import {
	selectDailyReading,
	selectIsWeatherDataLoaded,
} from "../../redux/weather/weather.selectors";

class CityList extends Component {
	render() {
		const { dailyReading, isWeatherDataLoaded } = this.props;

		return (
			<div className="city-list">
				{isWeatherDataLoaded ? (
					<CityListItem
						city={dailyReading.city}
						reading={dailyReading.reading}
					/>
				) : (
					<Spinner />
				)}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	dailyReading: selectDailyReading,
	isWeatherDataLoaded: selectIsWeatherDataLoaded,
});

export default connect(mapStateToProps)(CityList);
