import React from "react";
import classnames from "classnames";

import "./custom-button.styles.scss";

const CustomButton = ({ className, children, ...props }) => (
	<div className="custom-button">
		<button
			type="button"
			className={classnames("btn", className)}
			{...props}
		>
			{children}
		</button>
	</div>
);

export default CustomButton;
