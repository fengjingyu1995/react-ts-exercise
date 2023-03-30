import React from 'react';
import TextField from '@mui/material/TextField';
import { UserFormData } from '../userForm.model';

interface UserInfoFormProps {
  userFormData: UserFormData;
  updateFormData: (data: Partial<UserFormData>) => void;
}

function UserInfoForm({ userFormData, updateFormData }: UserInfoFormProps) {
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateFormData({ [name]: value });
  };
  return (
    <div className="mt-10">
      <TextField
        fullWidth
        margin="normal"
        name="firstName"
        label="First Name"
        value={userFormData.firstName}
        onChange={handleFormChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="lastName"
        label="Last Name"
        value={userFormData.lastName}
        onChange={handleFormChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="phoneNumber"
        label="Phone Number"
        value={userFormData.phoneNumber}
        onChange={handleFormChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="address"
        label="Address"
        value={userFormData.address}
        onChange={handleFormChange}
        required
      />
    </div>
  );
}

export default UserInfoForm;
