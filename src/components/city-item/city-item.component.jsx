import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

import "./city-item.styles.scss";

import { setDate, formatReading, getImgURL } from "../../utils/utils";

const CityItem = ({ city, reading, history, match }) => {
	console.log(match);
	return (
		<div
			className="city-item"
			onClick={() => history.push(`${match.path}city=${city.name}`)}
		>
			<div className="city-item-name">
				<h4>{`${city.name}, ${city.country}`}</h4>
				<p>{moment(setDate(reading[0])).format("MMMM Do, h:mm a")}</p>
			</div>
			<div className="city-item-weather">
				<img src={getImgURL(reading[0])} alt="weather icon" />
				<div className="item-weather-temp">
					<p>
						{
							formatReading("celsius", reading[0]).temperature
								.current
						}
					</p>
					<span>
						Min:{" "}
						{formatReading("celsius", reading[0]).temperature.min}
					</span>
					/
					<span>
						Max:{" "}
						{formatReading("celsius", reading[0]).temperature.max}
					</span>
				</div>
			</div>
		</div>
	);
};

export default withRouter(CityItem);
