import React, { useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ListboxComponent } from '../../../components/ListboxComponent';
import { StyledPopper } from '../../../components/PopperComponent';
import { UserFormData } from '../userForm.model';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
  isLoadingPokemons: boolean;
  pokemons: PokemonsObject | null;
  pokemonTypes: string[] | null;
}

function PokemonForm({
  userFormData,
  updateFormData,
  title,
  isLoadingPokemons,
  pokemons,
  pokemonTypes,
}: PokemonFormProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const favoritePokemon = userFormData.favoritePokemon;
    if (favoritePokemon && pokemons) {
      const pokemon = pokemons[favoritePokemon];
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

  const handleSelectChange = (event: SelectChangeEvent) => {
    updateFormData('favoritePokemon', '');
    updateFormData('selectedPokemonType', event.target.value);
    setSelectedPokemon(null);
  };

  const options = useMemo(() => {
    if (pokemons) {
      let options = Object.entries(pokemons);
      const { selectedPokemonType } = userFormData;
      if (userFormData.selectedPokemonType !== 'All') {
        options = options.filter(
          ([_, { type }]) => type === selectedPokemonType
        );
      }

      return options.map(([name]) => `${name}`);
    }
  }, [pokemons, userFormData.selectedPokemonType]);

  if (isLoadingPokemons || !options) return <div>Loading...</div>;

  return (
    <div className="mt-10 ">
      <h1 className="mb-5 text-3xl text-center">{title}</h1>
      <div className="my-5">
        <FormControl fullWidth>
          <InputLabel id="SelectedPokemonType">
            Select a pokemon type
          </InputLabel>
          <Select
            labelId="SelectedPokemonType"
            id="SelectedPokemonType-select"
            value={userFormData.selectedPokemonType || 'All'}
            label="Select a pokemon type"
            onChange={handleSelectChange}
          >
            <MenuItem value={'All'}>All</MenuItem>
            {pokemonTypes?.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
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
        <div className="flex justify-center mt-8 align-middle max-h-48">
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
