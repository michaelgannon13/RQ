/* eslint-disable */
export interface Pokemon {
  id: string;
  name: string;
  number: string;
  types: string[];
  image: string;
}

export interface PokemonDetails extends Pokemon {
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  resistant: string[];
  weaknesses: string[];
}

export interface PokemonOption {
  value: Pokemon['id'];
  label: Pokemon['name'];
}

export const TYPE_COLORS: { [key: string]: string } = {
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
}

export const getTypeColor = (type: string): string => {
  return TYPE_COLORS[type] || '#A8A878';
}; 