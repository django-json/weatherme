import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

import "./city.styles.scss";

import CustomButton from "../custom-button/custom-button.component";

import { setDate, formatReading, getImgURL } from "../../utils/utils";

const City = ({ city, reading, history, match, handleDeleteCity }) => {
	return (
		<div
			className="city-item"
			onClick={() => history.push(`${match.path}${city.id}`)}
		>
			<div className="city-item-name">
				<h4>{`${city.name}, ${city.country}`}</h4>
				<p>
					<span>Tomorrow,</span>
					{moment(setDate(reading)).format("MMMM Do, h:mm a")}
				</p>
			</div>
			<div className="city-item-weather">
				<img src={getImgURL(reading)} alt="weather icon" />
				<div className="item-weather-temp">
					<p>
						{formatReading("celsius", reading).temperature.current}
					</p>
					<span>
						Min: {formatReading("celsius", reading).temperature.min}
					</span>
					/
					<span>
						Max: {formatReading("celsius", reading).temperature.max}
					</span>
				</div>
			</div>
			<div className="btn-delete">
				<CustomButton
					className="btn-shape-circle"
					onClick={(event) => handleDeleteCity(event, city.id)}
				>
					&#10005;
				</CustomButton>
			</div>
		</div>
	);
};

export default withRouter(City);
