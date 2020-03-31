import React from "react";
import Modal from "react-modal";
import moment from "moment";

import "./day-card-modal.styles.scss";

import QRCodeGenerator from "../qrcode-generator/qrcode-generator.component";

const customStyles = {
	overlay: {
		backgroundColor: "rgba(20, 40, 80, 0.9)"
	},
	content: {
		top: "50%",
		left: "50%",
		right: "200px",
		bottom: "auto",
		minWidth: "300px",
		minHeight: "470px",
		transform: "translate(-50%, -50%)"
	}
};

Modal.setAppElement("#root");

const DayCardModal = ({
	isOpen,
	isGenerated,
	setIsGenerated,
	closeModal,
	contentLabel,
	reading,
	history
}) => {
	return (
		<div className="day-card-modal">
			<Modal
				isOpen={isOpen}
				style={customStyles}
				contentLabel={contentLabel}
			>
				<div className="clear-fix">
					<button className="btn" onClick={closeModal}>
						&#10005;
					</button>
				</div>
				{isGenerated ? (
					<QRCodeGenerator reading={reading} />
				) : (
					<div className="modal-content">
						<div className="modal-content-header">
							<div className="weather-icon">
								<img src={reading.imgURL} alt="weather icon" />
							</div>
							<div className="date-time">
								<h3>{moment(reading.date).format("dddd")}</h3>
								<p>
									{moment(reading.date).format(
										"MMMM Do, h:mm a"
									)}
								</p>
							</div>
						</div>
						<div className="modal-content-body">
							<div className="temperature">
								<p>
									Current Temperature:{" "}
									<b>{reading.temperature.current}</b>
								</p>
								<div className="min-max">
									<p>
										Min. Temp:{" "}
										<b>{reading.temperature.min}</b>
									</p>
									<p>
										Max. Temp:{" "}
										<b>{reading.temperature.max}</b>
									</p>
								</div>
								<p className="description">
									Description:{" "}
									<b>{reading.temperature.description}</b>
								</p>
							</div>
							<p>
								Humidity: <b>{`${reading.humidity}%`}</b>
							</p>
							<p>
								Wind Speed:{" "}
								<b>{`${reading.wind.speed} km/h, ${reading.wind.deg}°`}</b>
							</p>
						</div>
						<div className="clear-fix">
							<button
								className="btn"
								type="button"
								onClick={() => setIsGenerated(true)}
							>
								Generate QRCode
							</button>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default DayCardModal;
