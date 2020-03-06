import React, { Component } from 'react';

import './homepage.styles.scss';

import CityList from '../../components/city-list/city-list.component';

class HomePage extends Component {
	render() {
		return (
			<div className="homepage">
				<h2>CITIES</h2>
				<CityList />
			</div>
		);
	}
};

export default HomePage;