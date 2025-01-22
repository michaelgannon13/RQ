import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PokemonList } from './PokemonList';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/useGetPokemons');
jest.mock('../PokemonDialog/PokemonDialog', () => ({
  PokemonDialog: ({ open, onClose }: { open: boolean; onClose: () => void }) => (
    <div data-testid="pokemon-dialog" onClick={onClose}>Pokemon Dialog</div>
  ),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

interface SetupOptions {
  initialRoute?: string;
  loading?: boolean;
  pokemons?: Array<{ id: string; name: string; types: string[] }>;
}

describe('PokemonList', () => {
  const mockPokemons = [
    { id: '1', name: 'Bulbasaur', types: ['grass', 'poison'] },
    { id: '4', name: 'Charmander', types: ['fire'] },
    { id: '7', name: 'Squirtle', types: ['water'] },
  ];

  const setup = (options: SetupOptions = {}) => {
    const {
      initialRoute = '/pokemon',
      loading = false,
      pokemons = mockPokemons,
    } = options;

    (useGetPokemons as jest.Mock).mockReturnValue({
      pokemons,
      loading,
    });

    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/pokemon" element={<PokemonList />}>
            <Route path=":id" element={<PokemonList />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('shows spinner while loading data', () => {
      setup({ loading: true });
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('Pokemon Grid', () => {
    it('displays correct number of pokemon cards', () => {
      setup();
      const cards = screen.getAllByTestId('pokemon-card');
      expect(cards).toHaveLength(mockPokemons.length);
    });

    it('displays pokemon names correctly', () => {
      setup();
      mockPokemons.forEach(pokemon => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    // it('filters pokemon when searching by name', async () => {
    //   setup();
    //   const user = userEvent.setup();
      
    //   const searchInput = screen.getByPlaceholderText(/search pokemon/i);
    //   await user.type(searchInput, 'char');

    //   const cards = screen.getAllByTestId('pokemon-card');
    //   expect(cards).toHaveLength(1);
    //   expect(screen.getByText('Charmander')).toBeInTheDocument();
    //   expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
    // });

    // it('shows no results message for non-matching search', async () => {
    //   setup();
    //   const user = userEvent.setup();
      
    //   const searchInput = screen.getByPlaceholderText(/search pokemon/i);
    //   await user.type(searchInput, 'xyz');

    //   expect(screen.getByTestId('no-results')).toBeInTheDocument();
    // });
  });

  describe('Sorting Functionality', () => {
    // it('changes sort order when different option selected', async () => {
    //   setup();
    //   const user = userEvent.setup();
      
    //   const sortSelect = screen.getByLabelText(/sort by/i);
    //   await user.selectOptions(sortSelect, 'name');

    //   expect(sortSelect).toHaveValue('name');
    //   // You might want to add assertions about the actual sorting order
    //   const cards = screen.getAllByTestId('pokemon-card');
    //   const names = cards.map(card => card.textContent);
    //   expect(names).toEqual([...names].sort());
    // });
  });

  describe('Navigation and Dialog', () => {
    // it('navigates to pokemon details on card click', async () => {
    //   setup();
    //   const user = userEvent.setup();
      
    //   const firstCard = screen.getAllByTestId('pokemon-card')[0];
    //   await user.click(firstCard);

    //   expect(mockNavigate).toHaveBeenCalledWith('/pokemon/1');
    // });

    it('shows dialog when URL includes pokemon ID', () => {
      setup({ initialRoute: '/pokemon/1' });
      expect(screen.getByTestId('pokemon-dialog')).toBeInTheDocument();
    });

    it('closes dialog and navigates back', async () => {
      setup({ initialRoute: '/pokemon/1' });
      const user = userEvent.setup();
      
      const dialog = screen.getByTestId('pokemon-dialog');
      await user.click(dialog);

      expect(mockNavigate).toHaveBeenCalledWith('/pokemon');
    });
  });
}); 