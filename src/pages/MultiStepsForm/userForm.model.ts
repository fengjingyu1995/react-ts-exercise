export interface UserFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  favoritePokemon: string;
}

export type UserFormDataTouched = Record<keyof UserFormData, boolean>;
