import React from "react";
import PropTypes from "prop-types";

import "./address.styles.scss";

const Address = ({ name, id, handleClick }) => {
	return (
		<div className="address" onClick={() => handleClick(Number(id))}>
			<p>{name}</p>
		</div>
	);
};

Address.propTypes = {
	name: PropTypes.string,
};

Address.defaultProps = {
	name: "",
	onClick: () => {},
};

export default Address;
