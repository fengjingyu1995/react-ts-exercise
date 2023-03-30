import axios from 'axios';

const POKEMON_BASE_API = 'https://pokeapi.co/api/v2';

interface PokemonResponse {
  name: string;
  url: string;
}

interface PokemonTypeResponse {
  name: string;
  url: string;
}

interface PokemonTypeDetailsResponse {
  name: string;
  pokemon: {
    pokemon: PokemonResponse;
  }[];
}

export const fetchPokemons = () => {
  return axios
    .get(`${POKEMON_BASE_API}/pokemon`, {
      params: {
        limit: 2000,
        offset: 0,
      },
    })
    .then((response) => response.data.results as PokemonResponse[]);
};

export const fetchPokemonTypes = () => {
  return axios
    .get(`${POKEMON_BASE_API}/type`, {
      params: {
        limit: 100,
        offset: 0,
      },
    })
    .then((response) => response.data.results as PokemonTypeResponse[]);
};

export const fetchPokemonTypeDetails = (url: string) => {
  return axios
    .get(url)
    .then((response) => response.data as PokemonTypeDetailsResponse);
};
