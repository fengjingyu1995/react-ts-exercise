import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import PokemonForm, { PokemonsObject } from './PokemonForm/PokemonForm';
import UserForm from './UserInfoForm/UserInfoForm';
import { UserFormData } from './userForm.model';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewPage from './ReviewPage/ReviewPage';
import {
  loadUserFormDataFromStorage,
  removeUserFormDataFromStorage,
  saveUserFormDataToStorage,
} from './userFormDataStorage';
import { validateUserFormDataBySteps } from './validateUserFormDataBySteps';
import { loadPokemonsWithType } from './PokemonForm/loadPokemonsWithType';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { pushQueryParamToUrl } from '../../utils/pushQueryParamToUrl';

const steps = [
  'User Info',
  'Select your favorite pokemon',
  'Review your answers',
];

const initialUserFormData = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
  favoritePokemon: '',
  selectedPokemonType: 'All',
};

function MultiStepsForm() {
  const [userFormData, setUserFormData] =
    useState<UserFormData>(initialUserFormData);
  const [userFormDataErrors, setUserFormDataErrors] = useState<
    Partial<UserFormData>
  >({});
  const [isLoadingPokemons, setIsLoadingPokemons] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<PokemonsObject | null>(null);
  const [pokemonTypes, setPokemonTypes] = useState<string[] | null>(null);

  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const data = loadUserFormDataFromStorage();
    if (data) {
      setUserFormData(data);
    }
    const params = new URLSearchParams(location.search);
    const step = Number(params.get('step'));
    if (step && !isNaN(step) && step < steps.length) {
      const { hasError } = validateUserFormDataBySteps(
        data ?? userFormData,
        step - 1
      );
      if (!hasError) {
        setActiveStep(step);
      } else {
        pushQueryParamToUrl('step', `${activeStep}`);
      }
    }
    const fetchPokemonData = async () => {
      setIsLoadingPokemons(true);
      const { pokemonsObject, pokemonTypes } = await loadPokemonsWithType();
      setPokemons(pokemonsObject);
      setPokemonTypes(pokemonTypes);
      setIsLoadingPokemons(false);
    };

    fetchPokemonData();
  }, []);

  const updateFormData = (name: keyof UserFormData, value: string) => {
    setUserFormData((prevUserFormData) => {
      const newUserFormData = { ...prevUserFormData, [name]: value };
      if (!!userFormDataErrors[name]) {
        setUserFormDataErrors({ ...userFormDataErrors, [name]: undefined });
      }
      saveUserFormDataToStorage(newUserFormData);
      return newUserFormData;
    });
  };

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { hasError, errors } = validateUserFormDataBySteps(
      userFormData,
      activeStep
    );
    if (hasError) {
      setUserFormDataErrors(errors);
      return;
    }
    if (isLastStep()) {
      // complete
      navigate('/complete');
      // reset data
      removeUserFormDataFromStorage();
    } else {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      pushQueryParamToUrl('step', `${nextStep}`);
    }
  };

  const handleBack = () => {
    const prevActiveStep = activeStep - 1;
    setActiveStep(prevActiveStep);
    pushQueryParamToUrl('step', `${prevActiveStep}`);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const title = steps[activeStep];

  return (
    <div className="flex flex-col justify-center h-screen mx-5 lg:mx-36 md:mx-16">
      <form onSubmit={handleNext}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={handleStep(index)}>{label}</StepButton>
            </Step>
          ))}
        </Stepper>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '500px',
          }}
        >
          {activeStep === 0 && (
            <UserForm
              userFormData={userFormData}
              updateFormData={updateFormData}
              title={title}
              userFormDataErrors={userFormDataErrors}
            />
          )}
          {activeStep === 1 && (
            <PokemonForm
              userFormData={userFormData}
              updateFormData={updateFormData}
              title={title}
              isLoadingPokemons={isLoadingPokemons}
              pokemons={pokemons}
              pokemonTypes={pokemonTypes}
            />
          )}
          {activeStep === 2 && (
            <ReviewPage userFormData={userFormData} title={title} />
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            startIcon={<ChevronLeft />}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {/* TODO: disable button if data is invalid */}
          <Button
            type="submit"
            sx={{ mr: 1 }}
            endIcon={isLastStep() ? undefined : <ChevronRight />}
          >
            {isLastStep() ? 'Complete' : 'Next'}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default MultiStepsForm;
