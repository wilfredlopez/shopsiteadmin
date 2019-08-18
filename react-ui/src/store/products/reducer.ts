import { Reducer } from 'redux'
import { ProductsState, ProductsActionTypes } from './types'

// Type-safe initialState!
export const initialState: ProductsState = {
  data: [],
  errors: undefined,
  selected: undefined,
  loading: false,
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<ProductsState> = (state = initialState, action) => {
  switch (action.type) {
    case ProductsActionTypes.FETCH_REQUEST:
    case ProductsActionTypes.SELECT_PRODUCTS: {
      return { ...state, loading: true }
    }
    case ProductsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case ProductsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case ProductsActionTypes.SELECTED: {
      return { ...state, loading: false, selected: action.payload }
    }
    case ProductsActionTypes.CLEAR_SELECTED: {
      return { ...state, selected: undefined }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as productsReducer }
