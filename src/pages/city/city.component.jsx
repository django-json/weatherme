import React from "react";
import { WiRefresh } from "react-icons/wi";
import { IconContext } from "react-icons";

import "./city.styles.scss";

import CityAdditionContainer from "../../components/city-addition/city-addition.container";
import List from "../../components/list/list.component";
import City from "../../components/city/city.component";

const CityPage = ({
	cities,
	isCitiesLoaded,
	handleDeleteCity,
	refreshWeather,
	timeRefreshed,
}) => {
	return (
		<div className="city-page">
			<div className="city-page-header">
				<h2>CITIES</h2>
				<CityAdditionContainer />
			</div>
			<div className="list-container">
				{isCitiesLoaded ? (
					<IconContext.Provider value={{ className: "react-icons" }}>
						<div className="refresh-container">
							<span>Updated {timeRefreshed}</span>
							<span className="refresh" onClick={refreshWeather}>
								<WiRefresh />
							</span>
						</div>
						<List
							items={cities}
							itemRenderer={City}
							handleDeleteCity={handleDeleteCity}
						/>
					</IconContext.Provider>
				) : (
					<h2>No City Available. Add City to Show...</h2>
				)}
			</div>
		</div>
	);
};

export default CityPage;
