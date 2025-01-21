export interface Pokemon {
  id: string;
  number: string;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonDetails extends Pokemon {
  classification: string;
  height: {
    minimum: string;
    maximum: string;
  };
  weight: {
    minimum: string;
    maximum: string;
  };
  weaknesses: string[];
  resistant: string[];
} 