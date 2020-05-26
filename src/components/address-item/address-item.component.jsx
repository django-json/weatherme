import React from "react";
import PropTypes from "prop-types";

import "./address-item.styles.scss";

const AddressItem = ({ cityName, handleClick }) => (
	<div className="address-item" onClick={() => handleClick(cityName)}>
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
