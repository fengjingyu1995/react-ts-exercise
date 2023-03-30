import React, { useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { loadPokemonsWithType } from './loadPokemonsWithType';
import { ListboxComponent } from '../../../components/ListboxComponent';
import { StyledPopper } from '../../../components/PopperComponent';
import { UserFormData } from '../userForm.model';

interface Pokemon {
  url: string;
  type?: string;
  imgUrl?: string;
}
export interface PokemonsObject {
  [name: string]: Pokemon;
}

interface PokemonFormProps {
  userFormData: UserFormData;
  updateFormData: (data: Partial<UserFormData>) => void;
}

function PokemonForm({ userFormData, updateFormData }: PokemonFormProps) {
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

  const handleChange = (event: any, newValue: string | null) => {
    if (newValue) {
      updateFormData({ favoritePokemon: newValue });
    }
  };
  const options = useMemo(() => {
    if (pokemons) {
      return Object.entries(pokemons).map(
        ([name, { type }]) => `${name} (${type})`
      );
    }
  }, [pokemons]);

  if (isLoading || !options) return <div>Loading...</div>;

  return (
    <div className="mt-10">
      <Autocomplete
        sx={{ width: '100%' }}
        value={userFormData.favoritePokemon || null}
        onChange={handleChange}
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select your favorite pokemon"
            required
          />
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
