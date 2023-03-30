import React, { useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { loadPokemonsWithType } from './loadPokemonsWithType';
import { ListboxComponent } from '../../components/ListboxComponent';
import { StyledPopper } from '../../components/PopperComponent';

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
  console.log(options);

  if (isLoading || !options) return <div>Loading...</div>;

  return (
    <div className="max-w-sm p-5 mx-auto mt-10 bg-gray-50">
      <Autocomplete
        sx={{ width: 300 }}
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label="Select your favorite pokemon" />
        )}
        renderOption={(props, option, state) =>
          [props, option, state.index] as React.ReactNode
        }
        renderGroup={(params) => params as unknown as React.ReactNode}
      />
      {/* TODO: display image of selected pokemon below */}
    </div>
  );
}

export default PokemonForm;
