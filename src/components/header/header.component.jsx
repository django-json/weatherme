import React from 'react';

import './header.styles.scss';
import logo from '../../assets/weatherme.png';

import SearchBar from '../searchbar/searchbar.component';

const Header = () => (
	<div className="header">
		<div className="header-logo-container">
			<div className="header-logo">
				<img src={logo} alt="weatherme-logo" />
			</div>
			<div className="header-title">
				<h1>WEATHERMe</h1>
				<p>5-Day Weather Forecast</p>
			</div>
		</div>
		<SearchBar />
	</div>
);

export default Header;