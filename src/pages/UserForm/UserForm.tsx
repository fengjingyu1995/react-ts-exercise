import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { UserFormData } from './userForm.model';
import { validateFormData } from './validateFormData';

const defaultUserFormData = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
};

function Form() {
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

export default Form;
