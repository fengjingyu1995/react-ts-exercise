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

function App() {
  const [userFormData, setUserFormData] =
    useState<UserFormData>(defaultUserFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // reset form
    setUserFormData(defaultUserFormData);
    console.log(userFormData);
  };

  return (
    <div className="max-w-xs px-5 pb-5 bg-gray-50">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="firstName"
          label="First Name"
          value={userFormData.firstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="lastName"
          label="Last Name"
          value={userFormData.lastName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="phoneNumber"
          label="Phone Number"
          value={userFormData.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="address"
          label="Address"
          value={userFormData.address}
          onChange={handleChange}
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
