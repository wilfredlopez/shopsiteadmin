import { AuthInfo } from '../../api_types/ShopAppTypes'

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum AuthActionTypes {
  REGISTER_USER = '@@auth/REGISTER_USER',
  REQUEST_AUTH_SUCCESS = '@@/REQUEST_AUTH_SUCCESS',
  LOGOUT_SUCCESS = '@@auth/LOGOUT_SUCCESS',
  REQUEST_LOGOUT = '@@auth/REQUEST_LOGOUT',
  REQUEST_LOGIN = '@@auth/REQUEST_LOGIN',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  REQUEST_AUTH = '@@auth/REQUEST_AUTH',
  FETCH_SUCCESS = '@@auth/FETCH_SUCCESS',
  FETCH_ERROR = '@@auth/FETCH_ERROR',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface AuthState {
  readonly loading: boolean
  readonly data: AuthInfo
  readonly errors?: string
}
