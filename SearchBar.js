import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ doctors, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      const matches = doctors
        .filter(doctor => doctor.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      onSearch('');
    }
  };

  const handleSuggestionClick = (doctor) => {
    setSearchTerm(doctor.name);
    setShowSuggestions(false);
    onSearch(doctor.name);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
        placeholder="Search doctors by name..."
        className="search-input"
        data-testid="autocomplete-input"
      />
      {showSuggestions && (
        <div className="suggestions" data-testid="suggestions">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              className="suggestion-item"
              data-testid="suggestion-item"
              onClick={() => handleSuggestionClick(doctor)}
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;