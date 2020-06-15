import React from "react";
import PropTypes from "prop-types";

import "./address.styles.scss";

const Address = ({ name, handleClick }) => (
	<div className="address" onClick={() => handleClick(name)}>
		<p>{name}</p>
	</div>
);

Address.propTypes = {
	name: PropTypes.string,
};

Address.defaultProps = {
	name: "",
	onClick: () => {},
};

export default Address;
