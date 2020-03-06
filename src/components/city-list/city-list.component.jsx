import React from 'react';

import './city-list.styles.scss';

import CityListItem from '../city-list-item/city-list-item.component';

const CityList = () => (
	<div className="city-list">
		<CityListItem />
		<CityListItem />
		<CityListItem />
		<CityListItem />
		<CityListItem />
	</div>
);

export default CityList; 