import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonCard } from './PokemonCard';

const mockPokemon = {
  id: '1',
  number: '001',
  name: 'Bulbasaur',
  types: ['Grass', 'Poison'],
  image: 'https://example.com/bulbasaur.png'
};

describe('PokemonCard', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders pokemon information correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    expect(screen.getByText('#001')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByAltText('Bulbasaur')).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
    
    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByText('Poison')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);
    
    const card = screen.getByTestId('pokemon-card');
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('1');
  });

  it('has correct accessibility attributes', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);
    
    const card = screen.getByTestId('pokemon-card');
    
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('aria-label', 'Pokemon Bulbasaur, number 001');
  });

  it('renders with lazy loading image', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);
    
    const image = screen.getByAltText('Bulbasaur');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
}); 