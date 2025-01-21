import React from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../../types/pokemon';
import { PokemonCard } from '../PokemonCard/PokemonCard';

interface PokemonGridProps {
  pokemons: Pokemon[];
  onPokemonClick: (id: string) => void;
}

export const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemons,
  onPokemonClick,
}) => {
  const classes = useStyles();

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
};

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