import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonDialog } from '../PokemonDialog/PokemonDialog';

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

export const PokemonList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setSelectedPokemon(id);
    } else {
      setSelectedPokemon(null);
    }
  }, [id]);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = pokemon.types.some(type => 
      type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesName || matchesType;
  });

  const handlePokemonClick = (pokemonId: string) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const handleCloseDialog = () => {
    navigate('/pokemon');
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search by name or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
        />
      </div>
      {loading && <div className={classes.loading}>Loading...</div>}
      <div className={classes.grid} data-testid="pokemon-grid">
        {filteredPokemons.map((pokemon) => (
          <div 
            key={pokemon.id} 
            className={classes.card}
            onClick={() => handlePokemonClick(pokemon.id)}
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
                    style={{ backgroundColor: TYPE_COLORS[type] || '#777' }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PokemonDialog
        pokemonNumber={selectedPokemon}
        open={selectedPokemon !== null}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      padding: '32px',
      boxSizing: 'border-box',
    },
    loading: {
      textAlign: 'center',
      fontSize: '1.2rem',
      padding: '2rem',
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
    card: {
      background: 'white',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '250px',
      height: '350px',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      },
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
      width: 'auto',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      display: 'block',
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
      textTransform: 'capitalize',
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
    },
    searchContainer: {
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'center',
    },
    searchInput: {
      padding: '12px 20px',
      fontSize: '1rem',
      borderRadius: '24px',
      color: 'black',
      border: '2px solid #ddd',
      width: '100%',
      maxWidth: '400px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      '&:focus': {
        borderColor: '#6890F0',
      },
    },
  },
  { name: 'PokemonList' }
);
