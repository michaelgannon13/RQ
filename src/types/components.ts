export interface SpinnerProps {
  size?: number;
}

export interface PokemonDialogProps {
  pokemonNumber: string | null;
  open: boolean;
  onClose: () => void;
} 