// src/components/SearchBar.tsx
import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon from react-icons library

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
      
        type="text"
        placeholder="Search Pokémon by Name..."
        onChange={handleSearch}
        className="search-bar-input"
      />
    </div>
  );
};

export default SearchBar;
