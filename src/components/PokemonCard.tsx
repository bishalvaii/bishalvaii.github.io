import React from 'react';

interface PokemonCardProps {
  name: string;
  image: string;
  type: string;
}

const typeColors = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  bug: '#A8B820',
  normal: '#A8A878',
  poison: '#A040A0',
  electric: '#F8D030',
  ground: '#E0C068',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  flying: '#A890F0',
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, type }) => {
  const backgroundColor = typeColors[type] || '#A8A878'; // default to normal type color if type not found

  return (
    <div className="pokemon-card" style={{ backgroundColor }}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{type}</p>
    </div>
  );
};

export default PokemonCard;
