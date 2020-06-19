import React, { Fragment } from "react";
import Modal from "react-modal";

import "./city-addition.styles.scss";

import SearchBar from "../searchbar/searchbar.component";
import CustomButton from "../custom-button/custom-button.component";
import Spinner from "../spinner/spinner.component";
import List from "../list/list.component";

const CityAddition = ({
	modalIsOpen,
	openModal,
	closeModal,
	city,
	onSearchChange,
	onSearchSubmit,
	isFetchingCity,
	isCitySearchResultsLoaded,
	citySearchResults,
	addCity,
	toggleCaret,
	caretToggle,
	error,
}) => {
	return (
		<Fragment>
			<CustomButton onClick={() => openModal()}>ADD CITY</CustomButton>
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
				<div className="searchbar-container">
					<SearchBar
						city={city}
						onSearchChange={onSearchChange}
						onSearchSubmit={onSearchSubmit}
						error={error}
					/>
					{isCitySearchResultsLoaded && (
						<div className="caret" onClick={toggleCaret} />
					)}
				</div>
				<div className="list-container">
					{!isFetchingCity && !isCitySearchResultsLoaded && (
						<h4 className="info">No Available City</h4>
					)}
					{isFetchingCity ? (
						<Spinner />
					) : (
						isCitySearchResultsLoaded &&
						caretToggle && (
							<List
								className="list-scroll"
								handleClick={addCity}
								items={citySearchResults}
							/>
						)
					)}
				</div>
			</Modal>
		</Fragment>
	);
};

CityAddition.defaultProps = {
	modalIsOpen: false,
	closeModal: false,
};

export default CityAddition;
