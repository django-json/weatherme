import React, { createElement } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./list.styles.scss";

import Address from "../address/address.component";

const List = ({ items, itemRenderer, className, ...props }) => {
	return (
		<div className={classnames("list", className)}>
			{items.map((item, index) => {
				let newProps = Object.assign({ key: index }, item, {
					...props,
				});
				// console.log(newProps);
				return createElement(itemRenderer, newProps);
			})}
		</div>
	);
};

List.propTypes = {
	itemRenderer: PropTypes.func,
};

List.defaultProps = {
	items: [],
	itemRenderer: Address,
};

export default List;
