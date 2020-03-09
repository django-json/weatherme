import React from 'react';

import './day-card.styles.scss';

import DayCardModal from '../day-card-modal/day-card-modal.component';

class DayCard extends React.Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false
		};
	}

	openModal = () => {
		this.setState({
			modalIsOpen: true
		});
	};

	closeModal = () => {
		this.setState({
			modalIsOpen: false
		});
	};

	render() {
		return (
			<div className="day-card">
				<div className="card-content" onClick={this.openModal}>
					<h3>Day</h3>
					<p>Month, Time</p>
					<p>Weather icon</p>
					<div>Temperature value</div>
					<div>Weather description</div>
				</div>
				<DayCardModal 
					isOpen={this.state.modalIsOpen}
					closeModal={this.closeModal}
					contentLabel="Example Modal"
					fullReading="reading"
				/>
			</div>
		);
	}
}

export default DayCard;