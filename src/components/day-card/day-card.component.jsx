import React from "react";
import moment from "moment";

import "./day-card.styles.scss";

const DayCard = ({ reading, openModal, imgURL, cardID }) => {
	return (
		<div className="day-card">
			<div className="card-content" onClick={() => openModal(cardID)}>
				<h3 className="content-day">
					{moment(reading.date).format("dddd")}
				</h3>
				<p className="content-datetime">
					{moment(reading.date).format("MMMM Do, h:mm a")}
				</p>
				<img
					className="content-weathericon"
					src={imgURL}
					alt="weather icon"
				/>
				<p className="content-temperature">
					{reading.temperature.current}
				</p>
				<p className="content-description">
					{reading.temperature.description}
				</p>
			</div>
		</div>
	);
};

export default DayCard;
