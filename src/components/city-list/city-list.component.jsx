import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './city-list.styles.scss';

import Spinner from '../spinner/spinner.component';

import CityListItem from '../city-list-item/city-list-item.component';
import { selectDailyReading, selectIsWeatherLoaded } from '../../redux/weather/weather.selectors';

class CityList extends Component {
	render() {
		const { dailyReading, isWeatherLoaded } = this.props;

		return (
			<div className="city-list">
			{ isWeatherLoaded ? (
				<CityListItem city={dailyReading.city} reading={dailyReading.reading} />
			):(  <Spinner /> )
			}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	dailyReading: selectDailyReading,
	isWeatherLoaded: selectIsWeatherLoaded
});

export default connect(mapStateToProps)(CityList); 