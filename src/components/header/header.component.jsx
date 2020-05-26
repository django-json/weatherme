import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import "./header.styles.scss";
import logo from "../../assets/weatherme.png";

import { fetchDailyReadingStart } from "../../redux/weather/weather.actions";

const Header = ({ history, match, fetchDailyReadingStart }) => {
	return (
		<div className="header">
			<div className="header-logo-container">
				<Link to="/">
					<div className="header-logo">
						<img src={logo} alt="weatherme-logo" />
					</div>
				</Link>
				<div className="header-title">
					<h1>WEATHERMe</h1>
					<p>5-Day Weather Forecast</p>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetchDailyReadingStart: (city) => dispatch(fetchDailyReadingStart(city)),
});

export default withRouter(connect(null, mapDispatchToProps)(Header));

// const [city, setCity] = useState("");

// const onSearchChange = (event) => {
// 	setCity(event.target.value);
// };

// const onSearchSubmit = (event) => {
// 	event.preventDefault();

// 	fetchDailyReadingStart(city);
// 	history.push(`${match.path}${city}`);

// 	/*Clear city state*/
// 	setCity("");
// };

// <SearchBar
// 	city={city}
// 	onSearchChange={onSearchChange}
// 	onSearchSubmit={onSearchSubmit}
// />
