import { useMemo } from 'react';
import { Pokemon } from '../types/pokemon';

export const usePokemonFiltering = (pokemons: Pokemon[], searchTerm: string, sortBy: string) => {
  const normalizedSearchTerm = useMemo(() => 
    searchTerm.toLowerCase().trim(),
    [searchTerm]
  );

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon: Pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(normalizedSearchTerm);
      const matchesType = pokemon.types.some(type => 
        type.toLowerCase().includes(normalizedSearchTerm)
      );
      return matchesName || matchesType;
    });
  }, [pokemons, normalizedSearchTerm]);

  const sortedPokemons = useMemo(() => {
    return [...filteredPokemons].sort((a: Pokemon, b: Pokemon) => {
      switch (sortBy) {
        case 'number':
          return parseInt(a.number) - parseInt(b.number);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.types[0].localeCompare(b.types[0]);
        case 'typeCount':
          return b.types.length - a.types.length;
        case 'nameLength':
          return a.name.length - b.name.length;
        default:
          return 0;
      }
    });
  }, [filteredPokemons, sortBy]);

  return sortedPokemons;
}; 