import React, { useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { loadPokemonsWithType } from './loadPokemonsWithType';

interface Pokemon {
  url: string;
  type?: string;
  imgUrl?: string;
}
export interface PokemonsObject {
  [name: string]: Pokemon;
}

function PokemonForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<PokemonsObject | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const pokemonsObject = await loadPokemonsWithType();
      setPokemons(pokemonsObject);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const options = useMemo(() => {
    if (pokemons) {
      return Object.entries(pokemons).map(
        ([name, { type }]) => `${name} (${type})`
      );
    }
  }, [pokemons]);

  if (isLoading || !options) return <div>Loading...</div>;

  return (
    <div className="max-w-xs p-5 mx-auto mt-10 bg-gray-50">
      <Autocomplete
        disableClearable
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select your favorite pokemon"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </div>
  );
}

export default PokemonForm;
