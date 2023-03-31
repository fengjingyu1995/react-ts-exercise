import React from 'react';
import TextField from '@mui/material/TextField';
import { UserFormData } from '../userForm.model';

interface UserInfoFormProps {
  userFormData: UserFormData;
  updateFormData: (name: keyof UserFormData, value: string) => void;
  title: string;
  userFormDataErrors: Partial<UserFormData>;
}

function UserInfoForm({
  userFormData,
  updateFormData,
  userFormDataErrors,
  title,
}: UserInfoFormProps) {
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateFormData(name as keyof UserFormData, value);
  };
  return (
    <div className="mt-10">
      <h1 className="mb-5 text-3xl text-center">{title}</h1>
      <TextField
        fullWidth
        margin="normal"
        name="firstName"
        label="First Name"
        value={userFormData.firstName}
        onChange={handleFormChange}
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
        onChange={handleFormChange}
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
        onChange={handleFormChange}
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
        onChange={handleFormChange}
        error={!!userFormDataErrors.address}
        helperText={userFormDataErrors.address}
        required
      />
    </div>
  );
}

export default UserInfoForm;
