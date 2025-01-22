import { renderHook } from '@testing-library/react';
import { usePokemonFiltering } from './usePokemonFiltering';
import { Pokemon } from '../types/pokemon';

describe('usePokemonFiltering', () => {
  const mockPokemons: Pokemon[] = [
    { id: '1', number: '001', name: 'Bulbasaur', types: ['Grass', 'Poison'], image: '' },
    { id: '2', number: '004', name: 'Charmander', types: ['Fire'], image: '' },
    { id: '3', number: '007', name: 'Squirtle', types: ['Water'], image: '' },
    { id: '4', number: '025', name: 'Pikachu', types: ['Electric'], image: '' },
  ];

  describe('Filtering', () => {
    it('filters pokemon by name', () => {
      const { result } = renderHook(() => 
        usePokemonFiltering(mockPokemons, 'char', 'number')
      );
      
      expect(result.current).toHaveLength(1);
      expect(result.current[0].name).toBe('Charmander');
    });

    it('filters pokemon by type', () => {
      const { result } = renderHook(() => 
        usePokemonFiltering(mockPokemons, 'fire', 'number')
      );
      
      expect(result.current).toHaveLength(1);
      expect(result.current[0].name).toBe('Charmander');
    });

    it('returns all pokemon when search term is empty', () => {
      const { result } = renderHook(() => 
        usePokemonFiltering(mockPokemons, '', 'number')
      );
      
      expect(result.current).toHaveLength(4);
    });

    it('is case insensitive', () => {
      const { result } = renderHook(() => 
        usePokemonFiltering(mockPokemons, 'CHAR', 'number')
      );
      
      expect(result.current).toHaveLength(1);
      expect(result.current[0].name).toBe('Charmander');
    });
  });

  describe('Sorting', () => {
    it('sorts by number', () => {
      const { result } = renderHook(() => 
        usePokemonFiltering(mockPokemons, '', 'number')
      );
      
      expect(result.current.map(p => p.name)).toEqual([
        'Bulbasaur',
        'Charmander',
        'Squirtle',
        'Pikachu'
      ]);
    });

    it('sorts by name', () => {
      const { result } = renderHook(() => 
        usePokemonFiltering(mockPokemons, '', 'name')
      );
      
      expect(result.current.map(p => p.name)).toEqual([
        'Bulbasaur',
        'Charmander',
        'Pikachu',
        'Squirtle'
      ]);
    });

    it('sorts by type', () => {
      const { result } = renderHook(() => 
        usePokemonFiltering(mockPokemons, '', 'type')
      );
      
      expect(result.current.map(p => p.types[0])).toEqual([
        'Electric',
        'Fire',
        'Grass',
        'Water'
      ]);
    });

    it('sorts by type count', () => {
      const { result } = renderHook(() => 
        usePokemonFiltering(mockPokemons, '', 'typeCount')
      );
      
      expect(result.current[0].name).toBe('Bulbasaur'); // Only one with 2 types
      expect(result.current[0].types).toHaveLength(2);
      expect(result.current.slice(1).every(p => p.types.length === 1)).toBe(true);
    });

    it('sorts by name length', () => {
      const { result } = renderHook(() => 
        usePokemonFiltering(mockPokemons, '', 'nameLength')
      );
      
      expect(result.current.map(p => p.name)).toEqual([
        'Pikachu',
        'Squirtle',
        'Bulbasaur',
        'Charmander'
      ]);
    });

    it('returns unsorted array for invalid sort option', () => {
      const { result } = renderHook(() => 
        usePokemonFiltering(mockPokemons, '', 'invalid' as any)
      );
      
      expect(result.current).toHaveLength(4);
      expect(result.current).toEqual(mockPokemons);
    });
  });

  describe('Filtering and Sorting Combined', () => {
    it('filters first then sorts the results', () => {
      const { result } = renderHook(() => 
        usePokemonFiltering(mockPokemons, 'a', 'name')
      );
      
      expect(result.current.map(p => p.name)).toEqual([
        'Bulbasaur',
        'Charmander',
        'Pikachu'
      ]);
    });
  });
});