import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setQuery(''); // Arama yapıldıktan sonra girişi temizle
    }
  };

  return (
    <div className="search-bar">
      <FaSearch className="search-icon" onClick={handleSearch} />
      <input 
        type="text" 
        placeholder="Search..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Enter tuşuna basıldığında arama yap
      />
    </div>
  );
};

export default SearchBar;
