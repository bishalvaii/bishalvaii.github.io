
import React from 'react';
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
