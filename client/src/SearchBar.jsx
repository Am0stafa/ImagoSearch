import React, { useState } from 'react';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);  // state to manage focus

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log('User search:', searchText);
    }
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const searchContainerStyle = {
    width: '490px',
    display: 'block',
    margin: '0 auto'
  };

  const searchBarStyle = {
    margin: '0 auto',
    width: '100%',
    height: '45px',
    padding: '0 20px',
    fontSize: '1rem',
    border: isFocused ? '1px solid #008ABF' : '1px solid #D0CFCE',
    outline: 'none',
    color: isFocused ? '#008ABF' : 'black'
  };

  const searchIconStyle = {
    position: 'relative',
    float: 'right',
    width: '75px',
    height: '75px',
    top: '-62px',
    right: '-45px'
  };

  return (
    <form style={searchContainerStyle}>
      <input
        type="text"
        id="search-bar"
        style={searchBarStyle}
        placeholder="Search for an image by characteristic"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

    </form>
  );
};

export default SearchBar;
