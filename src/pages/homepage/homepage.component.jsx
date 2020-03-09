import React from 'react';

import './homepage.styles.scss';

import CityList from '../../components/city-list/city-list.component';

const HomePage = () => {
	return (
		<div className="homepage">
			<h2>CITIES</h2>
			<CityList />
		</div>
	);
};

export default HomePage;