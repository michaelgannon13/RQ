import React from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, getTypeColor } from '../../../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (id: string) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onClick,
}) => {
  const classes = useStyles();

  const getTypeBadgeStyle = (type: string) => ({
    backgroundColor: getTypeColor(type),
  });

  return (
    <div 
      className={classes.card}
      onClick={() => onClick(pokemon.id)}
      role="button"
      tabIndex={0}
    >
      <div className={classes.imageContainer}>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className={classes.image}
        />
      </div>
      <div className={classes.info}>
        <div className={classes.number}>#{pokemon.number}</div>
        <h3 className={classes.name}>{pokemon.name}</h3>
        <div className={classes.types}>
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={classes.type}
              style={getTypeBadgeStyle(type)}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  card: {
    background: 'white',
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
  type: {
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '0.8rem',
    color: 'white',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
  }
}, { name: 'PokemonCard' }); 