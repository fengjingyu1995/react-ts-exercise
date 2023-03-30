import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import PokemonForm from './PokemonForm/PokemonForm';
import UserForm from './UserInfoForm/UserInfoForm';
import { UserFormData } from './userForm.model';
import { useNavigate } from 'react-router-dom';

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
};

function MultiStepsForm() {
  const [userFormData, setUserFormData] =
    useState<UserFormData>(initialUserFormData);
  const [activeStep, setActiveStep] = React.useState(0);

  const navigate = useNavigate();

  const updateFormData = (data: Partial<UserFormData>) => {
    setUserFormData((prevUserFormData) => ({ ...prevUserFormData, ...data }));
  };

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLastStep()) {
      // complete
      navigate('/complete');
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        margin: '0 150px;',
      }}
    >
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
            />
          )}
          {activeStep === 1 && (
            <PokemonForm
              userFormData={userFormData}
              updateFormData={updateFormData}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {/* TODO: disable button if data is invalid */}
          <Button type="submit" sx={{ mr: 1 }}>
            {isLastStep() ? 'Complete' : 'Next'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default MultiStepsForm;