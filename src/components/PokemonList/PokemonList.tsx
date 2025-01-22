import React, { useState, useRef, useEffect } from 'react';
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
  const [visibleItems, setVisibleItems] = useState(20);
  const loaderRef = useRef(null);

  const filteredAndSortedPokemons = usePokemonFiltering(pokemons, searchTerm, sortBy);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && visibleItems < filteredAndSortedPokemons.length) {
          setTimeout(() => {
            setVisibleItems(prev => Math.min(prev + 20, filteredAndSortedPokemons.length));
          }, 300); // Simulate loading delay
        }
      },
      { 
        root: null,
        rootMargin: '100px',
        threshold: 0.1 
      }
    );

    const currentRef = loaderRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [visibleItems, filteredAndSortedPokemons.length]);

  useEffect(() => {
    setVisibleItems(20);
  }, [searchTerm, sortBy]);

  const handlePokemonClick = (pokemonId: string) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const handleCloseDialog = () => {
    navigate('/pokemon');
  };

  if (loading) return <Spinner />;

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOptions={SORT_OPTIONS}
        />
        
        <PokemonGrid 
          pokemons={filteredAndSortedPokemons.slice(0, visibleItems)}
          onPokemonClick={handlePokemonClick}
          searchTerm={searchTerm}
        />

        {visibleItems < filteredAndSortedPokemons.length && (
          <div ref={loaderRef} className={classes.loader}>
            <Spinner />
          </div>
        )}

        <PokemonDialog
          pokemonNumber={id || null}
          open={!!id}
          onClose={handleCloseDialog}
        />
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    height: '100vh',
    overflowY: 'auto',
    position: 'relative',
  },
  root: {
    width: '100%',
    padding: '32px',
    boxSizing: 'border-box',
    minHeight: '101vh', // Ensure scrollbar appears
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    marginTop: '20px',
  },
});
