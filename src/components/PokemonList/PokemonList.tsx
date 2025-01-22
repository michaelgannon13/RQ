import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonDialog } from '../PokemonDialog/PokemonDialog';
import { Spinner } from '../Spinner';
import { Pokemon } from '../../types/pokemon';
import { SearchInput } from '../common/SearchInput/SearchInput';
import { Select } from '../common/Select/Select';
import { PokemonGrid } from '../pokemon/PokemonGrid/PokemonGrid';
import { NoResults } from '../common/NoResults/NoResults';
import { SearchBar } from '../pokemon/SearchBar/SearchBar';

const SORT_OPTIONS = [
  { value: 'number', label: 'Sort by Number' },
  { value: 'name', label: 'Sort by Name (A-Z)' },
  { value: 'type', label: 'Sort by Primary Type' },
  { value: 'typeCount', label: 'Sort by Number of Types' },
  { value: 'nameLength', label: 'Sort by Name Length' },
];

function usePokemonFiltering(pokemons: Pokemon[], searchTerm: string, sortBy: string) {
  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon: Pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = pokemon.types.some(type => 
        type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesName || matchesType;
    });
  }, [pokemons, searchTerm]);

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
}

export const PokemonList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pokemons, loading, error } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('number');

  useEffect(() => {
    if (id) {
      setSelectedPokemon(id);
    } else {
      setSelectedPokemon(null);
    }
  }, [id]);

  const sortedPokemons = usePokemonFiltering(pokemons, searchTerm, sortBy);

  const handlePokemonClick = (pokemonId: string) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const handleCloseDialog = () => {
    navigate('/pokemon');
  };

  if (loading) return <Spinner />;
  if (error) return <div>Error loading Pokémon</div>;

  return (
    <div className={classes.root}>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOptions={SORT_OPTIONS}
      />
      
      {loading ? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) : sortedPokemons.length === 0 ? (
        <NoResults searchTerm={searchTerm} />
      ) : (
        <PokemonGrid 
          pokemons={sortedPokemons}
          onPokemonClick={handlePokemonClick}
        />
      )}

      <PokemonDialog
        pokemonNumber={selectedPokemon}
        open={selectedPokemon !== null}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

const useStyles = createUseStyles({
  root: {
    width: '100%',
    padding: '32px',
    boxSizing: 'border-box',
  },
  spinnerContainer: {
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}, { name: 'PokemonList' });
