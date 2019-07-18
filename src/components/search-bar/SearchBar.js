import React from 'react'
import './search-bar.css'

const SearchBar = () => {
    return (
        <div>
            <input type="text" placeholder="Search" className="form-control search-input"></input>
        </div>
    );
};

export default SearchBar;