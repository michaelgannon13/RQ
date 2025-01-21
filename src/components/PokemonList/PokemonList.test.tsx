import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { PokemonList } from './PokemonList';
import { useGetPokemons } from '../../hooks/useGetPokemons';

jest.mock('../../hooks/useGetPokemons');
const mockUseGetPokemons = useGetPokemons as jest.MockedFunction<typeof useGetPokemons>;

const mockPokemons = [
  {
    id: '1',
    name: 'Bulbasaur',
    number: '001',
    types: ['Grass', 'Poison'],
    image: 'https://example.com/bulbasaur.png',
  },
  {
    id: '25',
    name: 'Pikachu',
    number: '025',
    types: ['Electric'],
    image: 'https://example.com/pikachu.png',
  },
];

describe('PokemonList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state when data is being fetched', () => {
    mockUseGetPokemons.mockReturnValue({
      pokemons: [],
      pokemonOptions: [],
      loading: true,
    });

    render(<PokemonList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders pokemon cards with correct information', () => {
    mockUseGetPokemons.mockReturnValue({
      pokemons: mockPokemons,
      pokemonOptions: [],
      loading: false,
    });

    render(<PokemonList />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    expect(screen.getByText('#001')).toBeInTheDocument();
    expect(screen.getByText('#025')).toBeInTheDocument();

    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByText('Poison')).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();

    const bulbasaurImage = screen.getByAltText('Bulbasaur');
    const pikachuImage = screen.getByAltText('Pikachu');
    expect(bulbasaurImage).toBeInTheDocument();
    expect(pikachuImage).toBeInTheDocument();
    expect(bulbasaurImage).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
    expect(pikachuImage).toHaveAttribute('src', 'https://example.com/pikachu.png');
  });


  it('applies correct styles to type badges', () => {
    mockUseGetPokemons.mockReturnValue({
      pokemons: [mockPokemons[0]],
      pokemonOptions: [],
      loading: false,
    });

    render(<PokemonList />);

    const grassBadge = screen.getByText('Grass');
    const poisonBadge = screen.getByText('Poison');

    expect(grassBadge).toHaveStyle({ backgroundColor: '#78C850' });
    expect(poisonBadge).toHaveStyle({ backgroundColor: '#A040A0' });
  });

  describe('Search functionality', () => {
    beforeEach(() => {
      mockUseGetPokemons.mockReturnValue({
        pokemons: mockPokemons,
        pokemonOptions: [],
        loading: false,
      });
    });

    it('renders the search input', () => {
      render(<PokemonList />);
      expect(screen.getByPlaceholderText('Search by name or type...')).toBeInTheDocument();
    });

    it('filters pokemon by name', () => {
      render(<PokemonList />);
      const searchInput = screen.getByPlaceholderText('Search by name or type...');
      
      fireEvent.change(searchInput, { target: { value: 'bulba' } });
      
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    });

    it('filters pokemon by type', () => {
      render(<PokemonList />);
      const searchInput = screen.getByPlaceholderText('Search by name or type...');
      
      fireEvent.change(searchInput, { target: { value: 'Electric' } });
      
      expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });

    it('is case insensitive when filtering', () => {
      render(<PokemonList />);
      const searchInput = screen.getByPlaceholderText('Search by name or type...');
      
      fireEvent.change(searchInput, { target: { value: 'grass' } });
      
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });

    it('shows all pokemon when search is empty', () => {
      render(<PokemonList />);
      const searchInput = screen.getByPlaceholderText('Search by name or type...');
      
      fireEvent.change(searchInput, { target: { value: 'bulba' } });
      fireEvent.change(searchInput, { target: { value: '' } });
      
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });

    it('shows no results when search has no matches', () => {
      render(<PokemonList />);
      const searchInput = screen.getByPlaceholderText('Search by name or type...');
      
      fireEvent.change(searchInput, { target: { value: 'xyz123' } });
      
      expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
      expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    });
  });
}); 