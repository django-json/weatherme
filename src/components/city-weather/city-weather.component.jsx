import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "react-modal";
import moment from "moment";

import "./city-weather.styles.scss";

import DegreeToggle from "../../components/degree-toggle/degree-toggle.component";
import DayCard from "../../components/day-card/day-card.component";
import Spinner from "../spinner/spinner.component";
import QRCodeGenerator from "../qrcode-generator/qrcode-generator.component";

import {
	selectDailyReading,
	selectIsWeatherLoaded,
} from "../../redux/weather/weather.selectors";

const customStyles = {
	overlay: {
		backgroundColor: "rgba(20, 40, 80, 0.9)",
	},
	content: {
		top: "50%",
		left: "50%",
		right: "200px",
		bottom: "auto",
		minWidth: "300px",
		minHeight: "470px",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement("#root");

const CityWeather = ({ reading, isLoaded }) => {
	const [degreeUnit, setDegreeUnit] = useState("celsius");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [qrcodeIsGenerated, setQrcodeIsGenerated] = useState(false);
	const [modalID, setModalID] = useState("");

	const onDegreeUnitChange = (event) => {
		setDegreeUnit(event.target.value);
	};

	const openModal = (modalID) => {
		setModalIsOpen(true);
		setModalID(modalID);
	};

	const closeModal = () => {
		setModalIsOpen(false);
		setQrcodeIsGenerated(false);
	};

	const setDate = (reading) => {
		let newDate = new Date();
		const weekDay = reading.dt * 1000;
		/*Set Day*/
		newDate.setTime(weekDay);

		return newDate;
	};

	const setTemperature = (unit, value) => {
		return unit === "fahrenheit"
			? Math.round(value) + "°F"
			: Math.round(((value - 32) * 5) / 9) + "°C";
	};

	const getImgURL = (reading) => {
		return `http://openweathermap.org/img/w/${reading.weather[0].icon}.png`;
	};

	const formatReading = (reading) => {
		return {
			date: setDate(reading),
			temperature: {
				current: setTemperature(degreeUnit, reading.main.temp),
				min: setTemperature(degreeUnit, reading.main.temp_min),
				max: setTemperature(degreeUnit, reading.main.temp_max),
				description: reading.weather[0].description,
			},
			humidity: reading.main.humidity,
			wind: reading.wind,
		};
	};

	return isLoaded ? (
		<div className="city-weather">
			<h2>{`${reading.city.name}, ${reading.city.country}`}</h2>
			<DegreeToggle
				degreeUnit={degreeUnit}
				onDegreeUnitChange={onDegreeUnitChange}
			/>
			<div className="day-cards">
				{reading.reading.map((dayReading, index) => (
					<DayCard
						key={index}
						cardID={index}
						reading={formatReading(dayReading)}
						openModal={openModal}
						imgURL={getImgURL(dayReading)}
					/>
				))}
			</div>
			{modalID === 0 || modalID > 0 ? (
				<Modal
					isOpen={modalIsOpen}
					style={customStyles}
					contentLabel="Day Card Modal"
				>
					<div className="clear-fix">
						<button className="btn" onClick={closeModal}>
							&#10005;
						</button>
					</div>
					{qrcodeIsGenerated ? (
						<QRCodeGenerator
							reading={formatReading(reading.reading[modalID])}
						/>
					) : (
						<div className="modal-content">
							<div className="modal-content-header">
								<div className="weather-icon">
									<img
										src={getImgURL(
											reading.reading[modalID]
										)}
										alt="weather icon"
									/>
								</div>
								<div className="date-time">
									<h3>
										{moment(
											formatReading(
												reading.reading[modalID]
											).date
										).format("dddd")}
									</h3>
									<p>
										{moment(
											formatReading(
												reading.reading[modalID]
											).date
										).format("MMMM Do, h:mm a")}
									</p>
								</div>
							</div>
							<div className="modal-content-body">
								<div className="temperature">
									<p>
										Current Temperature:{" "}
										<b>
											{
												formatReading(
													reading.reading[modalID]
												).temperature.current
											}
										</b>
									</p>
									<div className="min-max">
										<p>
											Min. Temp:{" "}
											<b>
												{
													formatReading(
														reading.reading[modalID]
													).temperature.min
												}
											</b>
										</p>
										<p>
											Max. Temp:{" "}
											<b>
												{
													formatReading(
														reading.reading[modalID]
													).temperature.max
												}
											</b>
										</p>
									</div>
									<p className="description">
										Description:{" "}
										<b>
											{
												formatReading(
													reading.reading[modalID]
												).temperature.description
											}
										</b>
									</p>
								</div>
								<p>
									Humidity:{" "}
									<b>{`${
										formatReading(reading.reading[modalID])
											.humidity
									}%`}</b>
								</p>
								<p>
									Wind Speed:{" "}
									<b>{`${
										formatReading(reading.reading[modalID])
											.wind.speed
									} km/h, ${
										formatReading(reading.reading[modalID])
											.wind.deg
									}°`}</b>
								</p>
							</div>
							<div className="clear-fix">
								<button
									className="btn"
									type="button"
									onClick={() => setQrcodeIsGenerated(true)}
								>
									Generate QRCode
								</button>
							</div>
						</div>
					)}
				</Modal>
			) : null}
		</div>
	) : (
		<Spinner />
	);
};

const mapStateToProps = createStructuredSelector({
	reading: selectDailyReading,
	isLoaded: selectIsWeatherLoaded,
});

export default connect(mapStateToProps)(CityWeather);
