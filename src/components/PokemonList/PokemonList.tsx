import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonDialog } from '../PokemonDialog/PokemonDialog';
import { Spinner } from '../Spinner';

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
  const [sortBy, setSortBy] = useState('number');

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

  const sortedPokemons = [...filteredPokemons].sort((a, b) => {
    switch (sortBy) {
      case 'number':
        return parseInt(a.number) - parseInt(b.number);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'type':
        return a.types[0].localeCompare(b.types[0]);
      case 'typeCount':
        return b.types.length - a.types.length;
      case 'nameLength':
        return a.name.length - b.name.length;
      default:
        return 0;
    }
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
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={classes.sortSelect}
        >
          <option value="number">Sort by Number</option>
          <option value="name">Sort by Name (A-Z)</option>
          <option value="type">Sort by Primary Type</option>
          <option value="typeCount">Sort by Number of Types</option>
          <option value="nameLength">Sort by Name Length</option>
        </select>
      </div>
      {loading ? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) : sortedPokemons.length === 0 ? (
        <div className={classes.noResults}>
          <img 
            src="https://static1.srcdn.com/wordpress/wp-content/uploads/2022/09/Sad-Pikachu.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5" 
            alt="Sad Pikachu"
            className={classes.sadPikachu}
          />
          <div className={classes.noResultsMessage}>
            <h3>Oh no! No Pokémon found...</h3>
            <p>Even Pikachu couldn't find any matches for "{searchTerm}"</p>
          </div>
        </div>
      ) : (
        <div className={classes.grid} data-testid="pokemon-grid">
          {sortedPokemons.map((pokemon) => (
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
      )}

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
    spinnerContainer: {
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
      cursor: 'pointer',
      width: '100%',
      maxWidth: '250px',
      height: '350px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      isolation: 'isolate',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: '-2px',
        background: 'linear-gradient(45deg, #ff0000, #cc0000, #ffffff, #cc0000, #ff0000)',
        borderRadius: '14px',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
        zIndex: -2,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: '0',
        background: 'white',
        borderRadius: '12px',
        zIndex: -1,
      },
      '&:hover': {
        transform: 'translateY(-5px) scale(1.02)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        '&::before': {
          opacity: 1,
          animation: '$borderRotate 3s linear infinite',
        },
        '& $imageContainer': {
          '&::before': {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 0.1,
          },
        },
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
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '300px',
        height: '300px',
        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23FF0000'/%3E%3Cpath d='M5 50h90' stroke='white' stroke-width='10'/%3E%3Ccircle cx='50' cy='50' r='15' fill='white' stroke='%23333' stroke-width='4'/%3E%3C/svg%3E") center/contain no-repeat`,
        transform: 'translate(-50%, -50%) scale(0)',
        opacity: 0,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        pointerEvents: 'none',
      },
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
      gap: '16px',
      flexWrap: 'wrap',
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
    sortSelect: {
      padding: '12px 20px',
      fontSize: '1rem',
      borderRadius: '24px',
      color: '#333',
      border: '2px solid #ddd',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      cursor: 'pointer',
      backgroundColor: 'white',
      '&:focus': {
        borderColor: '#6890F0',
      },
    },
    '@keyframes borderRotate': {
      '0%': {
        filter: 'hue-rotate(0deg)',
      },
      '100%': {
        filter: 'hue-rotate(360deg)',
      },
    },
    noResults: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 20px',
      textAlign: 'center',
      minHeight: '400px',
      gap: '24px',
    },
    sadPikachu: {
      height: '200px',
      filter: 'grayscale(0.5) opacity(0.8)',
      animation: '$bounce 2s infinite ease-in-out',
    },
    noResultsMessage: {
      color: '#fff',
      '& h3': {
        fontSize: '1.5rem',
        marginBottom: '8px',
        color: '#fff',
      },
      '& p': {
        fontSize: '1.1rem',
        margin: 0,
      },
    },
    '@keyframes bounce': {
      '0%, 100%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-10px)',
      },
    },
  },
  { name: 'PokemonList' }
);
