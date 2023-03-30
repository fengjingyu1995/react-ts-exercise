import {
  fetchPokemons,
  fetchPokemonTypes,
  fetchPokemonTypeDetails,
} from './pokemonApis';
import { PokemonsObject } from './PokemonForm';

export const loadPokemonsWithType = async () => {
  const [pokemonResponse, typesResponse] = await Promise.all([
    fetchPokemons(),
    fetchPokemonTypes(),
  ]);
  const types = await Promise.all(
    typesResponse.map(({ url }) => fetchPokemonTypeDetails(url))
  );
  const pokemonsObject: PokemonsObject = pokemonResponse.reduce(
    (acc, pokemon) => {
      acc[pokemon.name] = { url: pokemon.url };
      return acc;
    },
    {} as PokemonsObject
  );
  types.forEach(({ pokemon, name: typeName }) => {
    pokemon.forEach(({ pokemon: { name: pokemonName } }) => {
      pokemonsObject[pokemonName].type = typeName;
    });
  });
  return pokemonsObject;
};
