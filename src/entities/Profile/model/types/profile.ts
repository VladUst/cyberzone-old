import { Currency } from 'entities/Currency/model/types/currency';
import { Country } from 'entities/Country';

export interface Profile {
  name?: string
  lastname?: string
  age?: number
  currency?: Currency
  country?: Country
  city?: string
  username?: string
  avatar?: string
}

export interface ProfileSchema {
  data?: Profile
  form?: Profile
  isLoading: boolean
  error?: string
  readonly: boolean
}
