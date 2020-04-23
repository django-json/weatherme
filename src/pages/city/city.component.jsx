import React from "react";

import "./city.styles.scss";

import CityList from "../../components/city-list/city-list.component";
import CityAdditionContainer from "../../components/city-addition/city-addition.container";

const CityPage = () => {
	return (
		<div className="city-page">
			<div className="city-page-header">
				<h2>CITIES</h2>
				<CityAdditionContainer />
			</div>
			<CityList />
		</div>
	);
};

export default CityPage;
