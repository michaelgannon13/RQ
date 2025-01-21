import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';
import { PokemonDialogProps } from '../../types/components';

const TYPE_COLORS: { [key: string]: string } = {
  Grass: '#78C850',
  Fire: '#F08030',
  Water: '#6890F0',
  Bug: '#A8B820',
  Normal: '#A8A878',
  Poison: '#A040A0',
  Electric: '#F8D030',
  Ground: '#E0C068',
  Fairy: '#EE99AC',
  Fighting: '#C03028',
  Psychic: '#F85888',
  Rock: '#B8A038',
  Ghost: '#705898',
  Ice: '#98D8D8',
  Dragon: '#7038F8',
  Flying: '#A890F0',
  Steel: '#B8B8D0',
  Dark: '#705848',
};

export const PokemonDialog: React.FC<PokemonDialogProps> = ({
  pokemonNumber: pokemonId,
  open,
  onClose,
}) => {
  const classes = useStyles();
  const { pokemon, loading } = useGetPokemonDetails(pokemonId);

  if (!open) return null;

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.dialog} onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <div className={classes.loading}>Loading...</div>
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
                  {pokemon.types.map((type: string) => (
                    <span
                      key={type}
                      className={classes.type}
                      style={{ backgroundColor: TYPE_COLORS[type] || '#777' }}
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
                          style={{ backgroundColor: TYPE_COLORS[type] || '#777' }}
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
                          style={{ backgroundColor: TYPE_COLORS[type] || '#777' }}
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
    backgroundColor: 'white',
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
    fontSize: '0.9rem',
    color: 'white',
    fontWeight: 'bold',
  },
  details: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  stat: {
    '& span': {
      fontWeight: 'bold',
      marginRight: '8px',
    },
  },
  attributes: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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