import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';
import { PokemonDialogProps } from '../../types/components';
import { getTypeColor } from '../../types/pokemon';
import Spinner from '../Spinner/Spinner';

export const PokemonDialog: React.FC<PokemonDialogProps> = ({
  pokemonNumber: pokemonId,
  open,
  onClose,
}) => {
  const classes = useStyles();
  const { pokemon, loading } = useGetPokemonDetails(pokemonId);

  if (!open) return null;

  const getTypeBadgeStyle = (type: string) => ({
    backgroundColor: getTypeColor(type),
  });

  return (
    <div className={classes.overlay} onClick={onClose} data-testid="pokemon-dialog-overlay">
      <div className={classes.dialog} onClick={(e) => e.stopPropagation()} data-testid="pokemon-dialog-content">
        {loading ? (
          <Spinner size={80} />
        ) : pokemon ? (
          <>
            <button className={classes.closeButton} onClick={onClose}>
              × 
            </button>
            <div className={classes.content}>
              <div className={classes.imageContainer}>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className={classes.image}
                />
              </div>
              <div className={classes.info}>
                <div className={classes.number}>#{pokemon.number}</div>
                <h2 className={classes.name}>{pokemon.name}</h2>
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
                <div className={classes.details}>
                  <div className={classes.stat}>
                    <span>Height:</span> {pokemon.height.minimum} - {pokemon.height.maximum}
                  </div>
                  <div className={classes.stat}>
                    <span>Weight:</span> {pokemon.weight.minimum} - {pokemon.weight.maximum}
                  </div>
                  <div className={classes.stat}>
                    <span>Classification:</span> {pokemon.classification}
                  </div>
                </div>
                <div className={classes.attributes}>
                  <div className={classes.attributeSection}>
                    <h3>Weaknesses</h3>
                    <div className={classes.typeList}>
                      {pokemon.weaknesses.map((type: string) => (
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
                  <div className={classes.attributeSection}>
                    <h3>Resistances</h3>
                    <div className={classes.typeList}>
                      {pokemon.resistant.map((type: string) => (
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
              </div>
            </div>
          </>
        ) : (
          <div className={classes.error}>Pokemon not found</div>
        )}
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    border: 'none',
    background: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    '&:hover': {
      color: '#333',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  imageContainer: {
    background: '#f5f5f5',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '200px',
    height: 'auto',
  },
  info: {
    textAlign: 'center',
  },
  number: {
    color: '#666',
    fontSize: '1.1rem',
  },
  name: {
    margin: '8px 0',
    fontSize: '2rem',
    color: '#333',
    textTransform: 'capitalize',
  },
  types: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  type: {
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '0.8rem',
    color: 'white',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
  },
  details: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#333',
  },
  stat: {
    color: '#333',
    textAlign: 'center',
    '& span': {
      fontWeight: 'bold',
      marginRight: '8px',
      color: '#333',
    },
  },
  attributes: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    color: '#333',
  },
  attributeSection: {
    '& h3': {
      margin: '0 0 8px 0',
      fontSize: '1.1rem',
      color: '#333',
    },
  },
  typeList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
  },
  loading: {
    textAlign: 'center',
    padding: '24px',
    fontSize: '1.2rem',
  },
  error: {
    textAlign: 'center',
    padding: '24px',
    color: 'red',
  },
}); 