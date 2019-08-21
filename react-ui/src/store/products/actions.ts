import { action } from 'typesafe-actions'
import { ProductsActionTypes, ProductSelectedPayload } from './types'
import { Product } from '../../api_types/ShopAppTypes'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = (cat: string) => action(ProductsActionTypes.FETCH_REQUEST, cat)
export const clearSelected = () => action(ProductsActionTypes.CLEAR_SELECTED)

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (data: Product[]) => action(ProductsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(ProductsActionTypes.FETCH_ERROR, message)

//cat/subcat
export const selectSubCategory = (catroute: string) =>
  action(ProductsActionTypes.SELECT_SUBCATEGORY, catroute)
export const selectProduct = (product_id: string) =>
  action(ProductsActionTypes.SELECT_PRODUCTS, product_id)
export const productSelected = (product: ProductSelectedPayload) =>
  action(ProductsActionTypes.SELECTED, product)
