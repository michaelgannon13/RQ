import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonDialog } from './PokemonDialog';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';

jest.mock('../../hooks/useGetPokemonDetails');
const mockUseGetPokemonDetails = useGetPokemonDetails as jest.Mock;

describe('PokemonDialog', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    pokemonNumber: '001',
    open: true,
    onClose: mockOnClose,
  };

  const mockPokemon = {
    id: '1',
    number: '001',
    name: 'Bulbasaur',
    types: ['Grass', 'Poison'],
    image: 'bulbasaur.jpg',
    height: {
      minimum: '0.61m',
      maximum: '0.79m',
    },
    weight: {
      minimum: '6.04kg',
      maximum: '7.76kg',
    },
    classification: 'Seed Pokémon',
    resistant: ['Water', 'Electric', 'Grass'],
    weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
    fleeRate: 0.1,
    maxCP: 951,
    maxHP: 1071
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetPokemonDetails.mockReturnValue({
      pokemon: mockPokemon,
      loading: false,
      error: null,
    });
  });

  it('should show loading state', () => {
    mockUseGetPokemonDetails.mockReturnValue({ loading: true, pokemon: null });
    render(<PokemonDialog {...defaultProps} />);
    
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should show error state when pokemon is not found', () => {
    mockUseGetPokemonDetails.mockReturnValue({ loading: false, pokemon: null });
    render(<PokemonDialog {...defaultProps} />);
    
    expect(screen.getByText('Pokemon not found')).toBeInTheDocument();
  });

  it('should call onClose when clicking overlay', () => {
    mockUseGetPokemonDetails.mockReturnValue({ loading: false, pokemon: mockPokemon });
    render(<PokemonDialog {...defaultProps} />);
    
    const overlay = screen.getByTestId('pokemon-dialog-overlay');
    fireEvent.click(overlay);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when clicking close button', () => {
    mockUseGetPokemonDetails.mockReturnValue({ loading: false, pokemon: mockPokemon });
    render(<PokemonDialog {...defaultProps} />);
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not close when clicking dialog content', () => {
    mockUseGetPokemonDetails.mockReturnValue({ loading: false, pokemon: mockPokemon });
    render(<PokemonDialog {...defaultProps} />);
    
    const dialog = screen.getByTestId('pokemon-dialog-content');
    fireEvent.click(dialog);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('displays all pokemon details correctly', () => {
    render(
      <PokemonDialog
        pokemonNumber="1"
        open={true}
        onClose={() => {}}
      />
    );

    expect(screen.getByText('#001')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Seed Pokémon')).toBeInTheDocument();
    expect(screen.getByText(/0.61m - 0.79m/)).toBeInTheDocument();
    expect(screen.getByText(/6.04kg - 7.76kg/)).toBeInTheDocument();
    expect(screen.getByText('951')).toBeInTheDocument();
    expect(screen.getByText('1071')).toBeInTheDocument();
    expect(screen.getByText('0.1')).toBeInTheDocument();
  });
}); 