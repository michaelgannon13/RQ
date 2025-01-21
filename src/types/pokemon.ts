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