import { useQuery, gql } from '@apollo/client';

const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      image
    }
  }
`;

export const useGetPokemonDetails = (pokemonNumber: string | null) => {
  const { data, loading, error } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id: pokemonNumber },
    skip: !pokemonNumber,
  });

  return {
    pokemon: data?.pokemon,
    loading,
    error,
  };
}; 