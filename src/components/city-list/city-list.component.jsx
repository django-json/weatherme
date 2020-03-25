import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './city-list.styles.scss';

import CityListItem from '../city-list-item/city-list-item.component';
import { selectDailyReading, selectIsWeatherLoaded } from '../../redux/weather/weather.selectors';

class CityList extends Component {
	constructor() {
		super();

		this.state = {
			cities: []
		};
	}

	componentDidMount() {
		this.setState({ cities: [...this.state.cities, this.props.dailyReading]});
	}

	render() {
		const { dailyReading, isWeatherLoaded } = this.props;
		// return (
		// 	<div className="city-list">
		// 		{
		// 			cities.length > 0 ?
		// 				cities.map((city, index) => (
		// 					<p key={index}>Hello</p>
		// 				))
		// 			: <h2>No City Available</h2>
		// 		}
		// 	</div>
		// );
		return (
			<div className="city-list">
			{ isWeatherLoaded ? (
				<CityListItem city={dailyReading.city} reading={dailyReading.reading} />
			):(  <p>Loading...</p> )
			}
			</div>
		);
	}
}

// const mapStateToProps = state => ({
// 	dailyReading: state.weather.dailyReading,
// 	isFetching: state.weather.isFetching
// });

const mapStateToProps = createStructuredSelector({
	dailyReading: selectDailyReading,
	isWeatherLoaded: selectIsWeatherLoaded
});

export default connect(mapStateToProps)(CityList); 