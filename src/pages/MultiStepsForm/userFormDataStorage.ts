import { UserFormData } from './userForm.model';

const userFormDataKey = 'userFormData';

export const loadUserFormDataFromStorage = () => {
  const savedUserFormData = localStorage.getItem(userFormDataKey);
  if (savedUserFormData) {
    return JSON.parse(savedUserFormData);
  }
  return null;
};

export const saveUserFormDataToStorage = (userFormData: UserFormData) => {
  localStorage.setItem(userFormDataKey, JSON.stringify(userFormData));
};

export const removeUserFormDataFromStorage = () => {
  localStorage.removeItem(userFormDataKey);
};
