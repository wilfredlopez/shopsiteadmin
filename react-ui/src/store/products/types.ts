import { Product } from '../../api_types/ShopAppTypes'

export interface ProductSelectedPayload {
  detail: Product
}

// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum ProductsActionTypes {
  FETCH_REQUEST = '@@products/FETCH_REQUEST',
  FETCH_SUCCESS = '@@products/FETCH_SUCCESS',
  FETCH_ERROR = '@@products/FETCH_ERROR',
  SELECT_PRODUCTS = '@@products/SELECT_PRODUCTS',
  SELECTED = '@@products/SELECTED',
  CLEAR_SELECTED = '@@products/CLEAR_SELECTED',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ProductsState {
  readonly loading: boolean
  readonly data: Product[]
  readonly selected?: ProductSelectedPayload
  readonly errors?: string
}
