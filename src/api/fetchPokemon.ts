// src/components/fetchPokemon.ts

interface Pokemon {
    name: string;
    url: string;
  }
  
  interface PokemonDetails {
    id: number;
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
  
  export const fetchAllPokemon = async (): Promise<PokemonDetails[]> => {
    const limit = 1118; // Fetching the first 151 Pokémon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    const pokemonList: Pokemon[] = data.results;
  
    const pokemonDetailsList = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const detailsResponse = await fetch(pokemon.url);
        if (!detailsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const details = await detailsResponse.json();
        return {
          id: details.id,
          name: details.name,
          sprites: {
            front_default: details.sprites.other['official-artwork'].front_default,
          },
          types: details.types,
        };
      })
    );
  
    return pokemonDetailsList;
  };
  