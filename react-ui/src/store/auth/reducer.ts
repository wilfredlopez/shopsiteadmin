import { Reducer } from 'redux'
import { AuthState, AuthActionTypes } from './types'

// Type-safe initialState!
export const initialState: AuthState = {
  data: {
    isAuth: false,
    email: null,
    token: null,
    userId: null,
  },
  errors: undefined,
  loading: false,
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.REQUEST_AUTH_SUCCESS: {
      const data = {
        isAuth: true,
        email: action.payload.email,
        token: action.payload.token,
        userId: action.payload._id,
      }
      return { ...state, loading: false, data: data, errors: undefined }
    }
    case AuthActionTypes.LOGOUT_SUCCESS: {
      return { ...initialState }
    }
    case AuthActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case AuthActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case AuthActionTypes.REGISTER_USER: {
      return { ...state }
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      localStorage.setItem('authToken', action.payload.token)
      const data = {
        isAuth: true,
        email: action.payload.email,
        token: action.payload.token,
        userId: action.payload._id,
      }
      return { ...state, loading: false, data: data, errors: undefined }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as AuthReducer }
