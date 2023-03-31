import React, { useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { loadPokemonsWithType } from './loadPokemonsWithType';
import { ListboxComponent } from '../../../components/ListboxComponent';
import { StyledPopper } from '../../../components/PopperComponent';
import { UserFormData } from '../userForm.model';
import axios from 'axios';

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
  updateFormData: (name: keyof UserFormData, value: string) => void;
  title: string;
}

function PokemonForm({
  userFormData,
  updateFormData,
  title,
}: PokemonFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<PokemonsObject | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const pokemonsObject = await loadPokemonsWithType();
      setPokemons(pokemonsObject);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const favoritePokemon = userFormData.favoritePokemon;
    if (favoritePokemon && pokemons) {
      const name = userFormData.favoritePokemon.split('(')[0].trim();
      const pokemon = pokemons[name];
      if (pokemon && pokemon.imgUrl == null) {
        axios.get(pokemon.url).then((response) => {
          const imgUrl =
            response.data?.sprites?.other?.dream_world?.front_default;
          if (imgUrl) {
            setSelectedPokemon({ ...pokemon, imgUrl });
          }
        });
      }
    }
  }, [userFormData.favoritePokemon, pokemons]);

  const handleChange = (event: any, newValue: string | null) => {
    if (newValue) {
      updateFormData('favoritePokemon', newValue);
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
    <div className="mt-10 ">
      <h1 className="mb-5 text-3xl text-center">{title}</h1>
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
      {selectedPokemon?.imgUrl && (
        <div className="flex justify-center mt-8 align-middle max-h-60">
          <img
            src={selectedPokemon.imgUrl}
            alt={userFormData.favoritePokemon}
          />
        </div>
      )}
    </div>
  );
}

export default PokemonForm;
