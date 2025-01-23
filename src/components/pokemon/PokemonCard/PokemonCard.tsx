import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../../types/pokemon';
import { TypeBadge } from '../../pokemon/TypeBadge/TypeBadge';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (id: string) => void;
}

export const PokemonCard = memo<PokemonCardProps>(({
  pokemon,
  onClick,
}) => {
  const classes = useStyles();

  const handleClick = () => {
    onClick(pokemon.id);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(pokemon.id);
    }
  };

  return (
    <div 
      data-testid="pokemon-card"
      className={classes.card}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`Pokemon ${pokemon.name}, number ${pokemon.number}`}
    >
      <div className={classes.imageContainer}>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className={classes.image}
          loading="lazy"
        />
      </div>
      <div className={classes.info}>
        <div className={classes.number}>#{pokemon.number}</div>
        <h3 className={classes.name}>{pokemon.name}</h3>
        <div className={classes.types}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
});

PokemonCard.displayName = 'PokemonCard';

const useStyles = createUseStyles({
  card: {
    background: '#f5f5f5',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '250px',
    height: '350px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    isolation: 'isolate',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px) scale(1.02)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
    },
    '&:focus': {
      outline: '2px solid #6890F0',
      outlineOffset: '2px',
    }
  },
  imageContainer: {
    background: '#f5f5f5',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  info: {
    textAlign: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  number: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '4px',
  },
  name: {
    margin: '0 0 8px 0',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  types: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}, { name: 'PokemonCard' }); 