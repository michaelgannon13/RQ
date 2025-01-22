import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonDialog } from '../PokemonDialog/PokemonDialog';
import { Spinner } from '../Spinner';
import { SearchBar } from '../pokemon/SearchBar/SearchBar';
import { PokemonGrid } from '../pokemon/PokemonGrid/PokemonGrid';
import { usePokemonFiltering } from '../../hooks/usePokemonFiltering';

const SORT_OPTIONS = [
  { value: 'number', label: 'Sort by Number' },
  { value: 'name', label: 'Sort by Name (A-Z)' },
  { value: 'type', label: 'Sort by Primary Type' },
  { value: 'typeCount', label: 'Sort by Number of Types' },
  { value: 'nameLength', label: 'Sort by Name Length' },
];

export const PokemonList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('number');

  const filteredAndSortedPokemons = usePokemonFiltering(pokemons, searchTerm, sortBy);

  const handlePokemonClick = (pokemonId: string) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const handleCloseDialog = () => {
    navigate('/pokemon');
  };

  if (loading) return <Spinner />;

  return (
    <div className={classes.root}>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOptions={SORT_OPTIONS}
      />
      
      <PokemonGrid 
        pokemons={filteredAndSortedPokemons}
        onPokemonClick={handlePokemonClick}
        searchTerm={searchTerm}
      />

      <PokemonDialog
        pokemonNumber={id || null}
        open={!!id}
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
});
