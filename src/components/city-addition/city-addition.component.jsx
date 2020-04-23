import React, { Fragment } from "react";
import Modal from "react-modal";

import "./city-addition.styles.scss";

import SearchBar from "../searchbar/searchbar.component";
import CustomButton from "../custom-button/custom-button.component";
import Spinner from "../spinner/spinner.component";

const CityAddition = ({
	modalIsOpen,
	onHandleAddCity,
	closeModal,
	city,
	onSearchChange,
	onSearchSubmit,
	isFetchingCity,
}) => {
	return (
		<Fragment>
			<CustomButton onClick={() => onHandleAddCity(true)}>
				ADD CITY
			</CustomButton>
			<Modal
				isOpen={modalIsOpen}
				contentLabel="City Addition Modal"
				className="modal"
				overlayClassName="modal-overlay"
			>
				<div className="clear-fix">
					<CustomButton
						className="btn-outline-primary btn-float-right"
						onClick={closeModal}
					>
						&#10005;
					</CustomButton>
				</div>
				<SearchBar
					city={city}
					onSearchChange={onSearchChange}
					onSearchSubmit={onSearchSubmit}
				/>
				{isFetchingCity ? <Spinner /> : <h3>No City Available</h3>}
			</Modal>
		</Fragment>
	);
};

CityAddition.defaultProps = {
	modalIsOpen: false,
	closeModal: false,
};

export default CityAddition;
