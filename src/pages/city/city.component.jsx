import React from 'react';

import './city.styles.scss';

import CityList from '../../components/city-list/city-list.component';

const CityPage = () => {
	return (
		<div className="city-page">
			<div className="city-page-header">
				<h2>CITIES</h2>
				<button type="button">ADD CITY</button>
			</div>
			<CityList />
		</div>
	);
};

export default CityPage;