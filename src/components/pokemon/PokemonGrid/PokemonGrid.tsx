import React, { memo, useMemo, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../../types/pokemon';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { NoResults } from '../../common/NoResults/NoResults';

interface PokemonGridProps {
  pokemons: Pokemon[];
  onPokemonClick: (id: string) => void;
  searchTerm: string;
}

export const PokemonGrid = memo<PokemonGridProps>(({
  pokemons,
  onPokemonClick,
  searchTerm,
}) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginatedPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return pokemons.slice(startIndex, endIndex);
  }, [pokemons, currentPage, pageSize]);

  const totalPages = Math.ceil(pokemons.length / pageSize);

  if (pokemons.length === 0) {
    return <NoResults searchTerm={searchTerm} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.grid} data-testid="pokemon-grid">
        {paginatedPokemon.map((pokemon, index) => (
          <div
            key={pokemon.id}
            className={classes.gridItem}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <PokemonCard
              pokemon={pokemon}
              onClick={onPokemonClick}
            />
          </div>
        ))}
      </div>
      
      {pokemons.length > pageSize && (
        <div className={classes.pagination}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={classes.paginationButton}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`${classes.paginationButton} ${currentPage === page ? classes.activeButton : ''}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={classes.paginationButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
});

PokemonGrid.displayName = 'PokemonGrid';

const useStyles = createUseStyles({
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(10px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px',
    padding: '16px',
    '& > *': {
      justifySelf: 'center',
    },
  },
  gridItem: {
    animation: '$fadeIn 0.1s ease-out forwards',
    opacity: 0,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '24px',
    padding: '16px',
  },
  paginationButton: {
    padding: '8px 16px',
    border: '1px solid #4B5066',
    borderRadius: '4px',
    background: '#171E2b',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: 'rgba(255,255,255,.92)',
    '&:disabled': {
      background: '#1f2635',
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '&:hover:not(:disabled)': {
      background: '#1f2635',
    },
  },
  activeButton: {
    background: '#4B5066',
    color: 'white',
    borderColor: '#7C89A3',
  },
}, { name: 'PokemonGrid' }); 