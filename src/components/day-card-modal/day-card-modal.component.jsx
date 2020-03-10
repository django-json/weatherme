import React from 'react';
import Modal from 'react-modal';

import './day-card-modal.styles.scss';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(20, 40, 80, 0.9)'
	},
	content: {
		top: '50%',
		left: '50%',
		right: '200px',
		bottom: 'auto',
		minWidth: "300px",
		transform: 'translate(-50%, -50%)'
	}
};

Modal.setAppElement('#root');

const DayCardModal = ({ isOpen, closeModal, contentLabel, fullReading }) => {
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
				<div className="modal-content">
					<div className="modal-content-header">
						<div className="date-time">
							<h3>DAY</h3>
							<p>Date & Time</p>
						</div>
						<div className="weather-icon">
							<span>ICON</span>
						</div>
					</div>
					<div className="modal-content-body">
						<div className="temperature">
							<p><b>Current Temperature</b></p>
							<div className="min-max">
								<span>MinT</span>/
								<span>MaxT</span>
							</div>
							<p>Description</p>
						</div>
						<p>Humidity</p>

						<p>Wind Speed</p>
					</div>
					<div className="clear-fix">
						<button className="btn" type="button">Generate QRCode</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DayCardModal;