import React, { useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
interface UserFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

const defaultUserFormData = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
};

const validateFormData = (userFormData: UserFormData) => {
  let hasError = false;
  const errors: UserFormData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  };
  Object.entries(userFormData).forEach(([key, value]) => {
    if (!value) {
      hasError = true;
      errors[key as keyof UserFormData] = `${key} is required`;
    }

    if (key === 'phoneNumber') {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        hasError = true;
        errors.phoneNumber = 'Please enter a valid phone number';
      }
    }
  });
  return {
    hasError,
    errors,
  };
};

function App() {
  const [userFormData, setUserFormData] =
    useState<UserFormData>(defaultUserFormData);
  const [userFormDataErrors, setUserFormDataErrors] =
    useState<UserFormData>(defaultUserFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    console.log(userFormDataErrors);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { hasError, errors } = validateFormData(userFormData);
    if (hasError) {
      setUserFormDataErrors(errors);
      return;
    }

    // reset form
    setUserFormData(defaultUserFormData);
  };

  return (
    <div className="max-w-xs px-5 pb-5 mx-auto bg-gray-50">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="firstName"
          label="First Name"
          value={userFormData.firstName}
          onChange={handleChange}
          error={!!userFormDataErrors.firstName}
          helperText={userFormDataErrors.firstName}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="lastName"
          label="Last Name"
          value={userFormData.lastName}
          onChange={handleChange}
          error={!!userFormDataErrors.lastName}
          helperText={userFormDataErrors.lastName}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="phoneNumber"
          label="Phone Number"
          value={userFormData.phoneNumber}
          onChange={handleChange}
          error={!!userFormDataErrors.phoneNumber}
          helperText={userFormDataErrors.phoneNumber}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="address"
          label="Address"
          value={userFormData.address}
          onChange={handleChange}
          error={!!userFormDataErrors.address}
          helperText={userFormDataErrors.address}
          required
        />
        <div className="py-5">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className="m-4"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default App;
