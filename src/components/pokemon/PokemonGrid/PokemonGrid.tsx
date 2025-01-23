import React, { memo } from 'react';
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

  if (pokemons.length === 0) {
    return <NoResults searchTerm={searchTerm} />;
  }

  return (
    <div className={classes.grid}>
      {pokemons.map((pokemon, index) => (
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
}, { name: 'PokemonGrid' }); 