import React from 'react';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: { [key: string]: string } = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  // Add more type colors as needed
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { name, sprites, types } = pokemon;
  const image = sprites?.front_default || ''; // Use optional chaining to handle null or undefined sprites
  const type = types?.[0]?.type?.name || ''; // Use optional chaining to handle null or undefined types

  const backgroundColor = typeColors[type] || '#A8A878';

  return (
    <div className="pokemon-card" style={{ backgroundColor }}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{type}</p>
    </div>
  );
};

export default PokemonCard;
