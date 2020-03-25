import React from 'react';

import './searchbar.styles.scss';

const SearchBar = ({ city, onSearchChange, onSearchSubmit }) => (
	<div className="searchbar">
		<form onSubmit={onSearchSubmit}>
			<input
				type="text"
				value={city}
				placeholder="Search City"
				onChange={onSearchChange}
			/>
		</form>
	</div>
);

export default SearchBar;