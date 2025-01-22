import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  const defaultProps = {
    searchTerm: '',
    onSearchChange: jest.fn(),
    sortBy: 'id',
    onSortChange: jest.fn(),
    sortOptions: [
      { value: 'id', label: 'ID' },
      { value: 'name', label: 'Name' },
    ],
  };

  it('renders search input and select components', () => {
    render(<SearchBar {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Search by name or type...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays the current search term', () => {
    render(<SearchBar {...defaultProps} searchTerm="pikachu" />);
    
    const searchInput = screen.getByPlaceholderText('Search by name or type...') as HTMLInputElement;
    expect(searchInput.value).toBe('pikachu');
  });

  it('calls onSearchChange when search input changes', () => {
    const onSearchChange = jest.fn();
    render(<SearchBar {...defaultProps} onSearchChange={onSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search by name or type...');
    fireEvent.change(searchInput, { target: { value: 'char' } });
    
    expect(onSearchChange).toHaveBeenCalledWith('char');
  });

  it('displays the current sort option', () => {
    render(<SearchBar {...defaultProps} sortBy="name" />);
    
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('name');
  });

  it('calls onSortChange when sort option changes', () => {
    const onSortChange = jest.fn();
    render(<SearchBar {...defaultProps} onSortChange={onSortChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'name' } });
    
    expect(onSortChange).toHaveBeenCalledWith('name');
  });
}); 