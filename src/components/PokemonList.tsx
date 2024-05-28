import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from './SearchBar';
import PokemonCard from './PokemonCard';
import { fetchAllPokemon } from '../api/fetchPokemon';

const PokemonList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [pageNumberInput, setPageNumberInput] = useState('');

  const { data, error, isLoading } = useQuery({
    queryKey: ['pokemon'],
    queryFn: fetchAllPokemon,
    staleTime: 3600000, 
  });

  useEffect(() => {
    if (data) {
      const filtered = data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPokemon(filtered);
      setCurrentPage(0); // Reset to the first page on new search
    }
  }, [searchQuery, data]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredPokemon.length / limit) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(pageNumberInput, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= Math.ceil(filteredPokemon.length / limit)) {
      setCurrentPage(pageNumber - 1);
      setPageNumberInput('');
    }
  };

  if (isLoading) return <div>Please wait till the data loads...</div>;
  if (error) return <div>Error loading Pokémon data</div>;

  const limit = 20; // Number of Pokémon per page
  const paginatedPokemon = filteredPokemon.slice(currentPage * limit, (currentPage + 1) * limit);

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      {paginatedPokemon.length === 0 && <div style={{fontWeight: 'bold', fontSize: 20, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>No results found</div>}
      <div className="pokemon-list">
        {paginatedPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            type={pokemon.types[0].type.name}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <div className="page-info">
          Page {currentPage + 1} of {Math.ceil(filteredPokemon.length / limit)}
        </div>
        <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(filteredPokemon.length / limit) - 1}>
          Next
        </button>
        <div className="go-to-page">
          Go to Page: {' '}
          <input
            type="number"
            value={pageNumberInput}
            onChange={(e) => setPageNumberInput(e.target.value)}
            min="1"
            max={Math.ceil(filteredPokemon.length / limit)}
          />
          <button onClick={handleGoToPage}>Go</button>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
