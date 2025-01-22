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
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={onPokemonClick}
        />
      ))}
    </div>
  );
});

PokemonGrid.displayName = 'PokemonGrid';

const useStyles = createUseStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px',
    padding: '16px',
    '& > *': {
      justifySelf: 'center',
    },
  },
}, { name: 'PokemonGrid' }); 