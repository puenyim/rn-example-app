export interface UserAddress {
  address: string;
  city: string;
  state?: string;
  stateCode?: string;
  postalCode: string;
  country?: string;
}

export interface UserBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}
export interface UserCompany {
  name: string;
  title?: string;
  department?: string;
  address?: UserAddress;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate?: string;
  image: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  address?: UserAddress;
  company?: UserCompany;
  university?: string;
  bank?: UserBank;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
