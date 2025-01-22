import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonGrid } from './PokemonGrid';
import { Pokemon } from '../../../types/pokemon';

describe('PokemonGrid', () => {
  const mockOnPokemonClick = jest.fn();
  
  const mockPokemons: Pokemon[] = [
    {
      id: '1',
      number: '001',
      name: 'Bulbasaur',
      types: ['grass', 'poison'],
      image: 'bulbasaur.png'
    },
    {
      id: '2',
      number: '002',
      name: 'Charmander',
      types: ['fire'],
      image: 'charmander.png'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pokemon cards for each pokemon', () => {
    render(
      <PokemonGrid 
        pokemons={mockPokemons}
        onPokemonClick={mockOnPokemonClick}
        searchTerm=""
      />
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  it('shows NoResults component when pokemons array is empty', () => {
    const searchTerm = 'NonexistentPokemon';
    render(
      <PokemonGrid 
        pokemons={[]}
        onPokemonClick={mockOnPokemonClick}
        searchTerm={searchTerm}
      />
    );

    expect(screen.getByText(/Oh no! No Pokémon found.../i)).toBeInTheDocument();
  });

  it('calls onPokemonClick with correct pokemon id when card is clicked', () => {
    render(
      <PokemonGrid 
        pokemons={mockPokemons}
        onPokemonClick={mockOnPokemonClick}
        searchTerm=""
      />
    );

    const firstPokemonCard = screen.getByText('Bulbasaur').closest('div');
    fireEvent.click(firstPokemonCard!);

    expect(mockOnPokemonClick).toHaveBeenCalledWith('1');
  });

  it('applies correct grid styling', () => {
    const { container } = render(
      <PokemonGrid 
        pokemons={mockPokemons}
        onPokemonClick={mockOnPokemonClick}
        searchTerm=""
      />
    );

    const gridElement = container.firstChild;
    expect(gridElement).toHaveStyle({
      display: 'grid',
      gap: '24px',
      padding: '16px'
    });
  });
}); 