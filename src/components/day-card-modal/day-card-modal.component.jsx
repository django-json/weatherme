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
				<button className="modal-close" onClick={closeModal}>
					Close
				</button>
				<div className="modal-content">
					<h3>Day</h3>
					<span>ICON</span>
					<p>Date & Time</p><br />

					<p>Current Temperature</p>
					<p>Description</p><br />

					<span>MinT</span>/
					<span>MaxT</span><br />

					<p>Humidity</p><br />

					<p>Wind Speed</p>

					<button type="button">Generate QRCode</button>
				</div>
			</Modal>
		</div>
	);
};

export default DayCardModal;