import React from 'react';
import { render, screen } from '@testing-library/react';
import { TypeBadge } from './TypeBadge';
import { getTypeColor } from '../../../types/pokemon';

describe('TypeBadge', () => {
  it('renders the type text correctly', () => {
    render(<TypeBadge type="fire" />);
    expect(screen.getByText('fire')).toBeInTheDocument();
  });

  it('applies the correct background color based on type', () => {
    render(<TypeBadge type="water" />);
    const badge = screen.getByText('water');
    const expectedColor = getTypeColor('water');
    expect(badge).toHaveStyle({ backgroundColor: expectedColor });
  });

  it('maintains consistent styling properties', () => {
    render(<TypeBadge type="grass" />);
    const badge = screen.getByText('grass');
    expect(badge).toHaveStyle({
      borderRadius: '16px',
      color: 'white',
      fontWeight: 'bold'
    });
  });
}); 