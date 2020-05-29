import React from "react";
import PropTypes from "prop-types";

import "./address.styles.scss";

const Address = ({ cityName, handleClick }) => (
	<div className="address" onClick={() => handleClick(cityName)}>
		<p>{cityName}</p>
	</div>
);

Address.propTypes = {
	cityName: PropTypes.string,
};

Address.defaultProps = {
	cityName: "",
	onClick: () => {},
};

export default Address;
