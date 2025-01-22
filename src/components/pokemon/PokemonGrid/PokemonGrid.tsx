import React, { useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../../types/pokemon';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { NoResults } from '../../common/NoResults/NoResults';

interface PokemonGridProps {
  pokemons: Pokemon[];
  onPokemonClick: (id: string) => void;
  searchTerm: string;
}

export const PokemonGrid = ({ pokemons, onPokemonClick, searchTerm }: PokemonGridProps) => {
  const classes = useStyles();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(classes.visible);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const cards = document.querySelectorAll(`.${classes.cardContainer}`);
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, [pokemons]);

  if (pokemons.length === 0) {
    return <NoResults searchTerm={searchTerm} />;
  }

  return (
    <div className={classes.grid}>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className={classes.cardContainer}>
          <PokemonCard
            pokemon={pokemon}
            onClick={() => onPokemonClick(pokemon.id)}
            highlight={searchTerm}
          />
        </div>
      ))}
    </div>
  );
};

const useStyles = createUseStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    padding: '24px 0',
  },
  cardContainer: {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}, { name: 'PokemonGrid' }); 