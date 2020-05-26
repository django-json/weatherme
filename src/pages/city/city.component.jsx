import React from "react";

import "./city.styles.scss";

// import CityList from "../../components/city-list/city-list.component";
import CityAdditionContainer from "../../components/city-addition/city-addition.container";
import List from "../../components/list/list.component";
import CityItem from "../../components/city-item/city-item.component";
import Spinner from "../../components/spinner/spinner.component";

const CityPage = ({ cities, isCitiesLoaded }) => {
	return (
		<div className="city-page">
			<div className="city-page-header">
				<h2>CITIES</h2>
				<CityAdditionContainer />
			</div>
			<div className="list-container">
				{isCitiesLoaded ? (
					<List items={cities} itemRenderer={CityItem} />
				) : (
					<Spinner />
				)}
			</div>
		</div>
	);
};

export default CityPage;
