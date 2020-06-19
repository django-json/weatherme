import React from "react";

import "./searchbar.styles.scss";

const SearchBar = ({ city, onSearchChange, onSearchSubmit, error }) => (
	<div className="searchbar">
		<form onSubmit={onSearchSubmit}>
			<input
				type="text"
				value={city}
				placeholder="Search City"
				onChange={onSearchChange}
			/>
			{error.length > 0 && <span className="error">{error}</span>}
		</form>
	</div>
);

export default SearchBar;
