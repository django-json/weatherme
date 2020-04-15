import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import "./custom-modal.styles.scss";

import CustomButton from "../custom-button/custom-button.component";

Modal.setAppElement("#root");

const CustomModal = ({ isOpen, closeModal, contentLabel, children }) => (
	<div className="custom-modal">
		<Modal
			isOpen={isOpen}
			contentLabel={contentLabel}
			className="modal"
			overlayClassName="modal-overlay"
		>
			<div className="custom-modal-header clear-fix">
				<h3>Add City</h3>
				<CustomButton
					className="btn-float-right btn-outline-primary"
					onClick={closeModal}
				>
					&#10005;
				</CustomButton>
			</div>
			<div className="custom-modal-body">{children}</div>
		</Modal>
	</div>
);

const mapStateToProps = (state) => ({
	isOpen: state.modal.isModalOpen,
});

export default connect(mapStateToProps)(CustomModal);
