import React from "react";
import PropTypes from "prop-types";

import "./address-item.styles.scss";

const AddressItem = ({ cityName, onClick }) => (
	<div className="address-item" onClick={() => onClick(cityName)}>
		<p>{cityName}</p>
	</div>
);

AddressItem.propTypes = {
	cityName: PropTypes.string,
};

AddressItem.defaultProps = {
	cityName: "",
	onClick: () => {},
};

export default AddressItem;
