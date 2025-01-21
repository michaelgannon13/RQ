import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { PokemonDetails } from '../../types';

type PokemonType = 'Grass' | 'Fire' | 'Water' | 'Bug' | 'Normal' | 'Poison' | 
  'Electric' | 'Ground' | 'Fairy' | 'Fighting' | 'Psychic' | 'Rock' | 
  'Ghost' | 'Ice' | 'Dragon' | 'Flying' | 'Steel' | 'Dark';

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

interface PokemonDialogProps {
  open: boolean;
  pokemon: PokemonDetails | null;
  onClose: () => void;
}

export const PokemonDialog = ({ open, pokemon, onClose }: PokemonDialogProps) => {
  if (!pokemon) return null;

  const getTypeColor = (type: string) => TYPE_COLORS[type] || '#777';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {pokemon.name} #{pokemon.number}
      </DialogTitle>
      <DialogContent>
        <img 
          src={pokemon.image}
          alt={pokemon.name}
          style={{ width: 200 }}
        />
        <h3>Types</h3>
        {pokemon.types.map((type) => (
          <span
            key={type}
            style={{
              padding: '4px 8px',
              margin: '0 4px',
              borderRadius: '4px',
              backgroundColor: getTypeColor(type),
              color: 'white',
            }}
          >
            {type}
          </span>
        ))}
        
        <h3>Details</h3>
        <p>Height: {pokemon.height.minimum} - {pokemon.height.maximum}</p>
        <p>Weight: {pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
        <p>Classification: {pokemon.classification}</p>

        <h3>Weaknesses</h3>
        {pokemon.weaknesses.map((type) => (
          <span
            key={type}
            style={{
              padding: '4px 8px',
              margin: '0 4px',
              borderRadius: '4px',
              backgroundColor: getTypeColor(type),
              color: 'white',
            }}
          >
            {type}
          </span>
        ))}

        <h3>Resistances</h3>
        {pokemon.resistant.map((type) => (
          <span
            key={type}
            style={{
              padding: '4px 8px',
              margin: '0 4px',
              borderRadius: '4px',
              backgroundColor: getTypeColor(type),
              color: 'white',
            }}
          >
            {type}
          </span>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}; 