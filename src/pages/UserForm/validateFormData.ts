import { UserFormData } from './userForm.model';

export const validateFormData = (userFormData: UserFormData) => {
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
