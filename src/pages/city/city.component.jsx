import React from "react";

import "./city.styles.scss";

// import CityList from "../../components/city-list/city-list.component";
import CityAdditionContainer from "../../components/city-addition/city-addition.container";
import List from "../../components/list/list.component";
import CityItem from "../../components/city-item/city-item.component";

const CityPage = ({ cities }) => {
	return (
		<div className="city-page">
			<div className="city-page-header">
				<h2>CITIES</h2>
				<CityAdditionContainer />
			</div>
			<List items={cities} itemRenderer={CityItem} />
		</div>
	);
};

export default CityPage;
