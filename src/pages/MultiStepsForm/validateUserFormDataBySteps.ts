import { UserFormData } from './userForm.model';

export const validateUserFormDataBySteps = (
  userFormData: UserFormData,
  curStep: number
) => {
  const errors: Partial<UserFormData> = {};
  let hasError = false;

  for (const [key, value] of Object.entries(userFormData)) {
    if (key === 'favoritePokemon' && curStep < 1) continue;
    if (!value.trim()) {
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
  }

  return { hasError, errors };
};
