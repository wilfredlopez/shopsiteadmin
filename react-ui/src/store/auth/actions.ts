import { action } from 'typesafe-actions'
import { AuthActionTypes } from './types'
import { AuthInfo, UserProfile } from '../../api_types/ShopAppTypes'

// import { ThunkDispatch } from '../thunk/types'

// export const register = async (profiledata: UserProfile) => {
//   const registerData = {
//     email: profiledata.email,
//     password: profiledata.password,
//     profile: {
//       firstName: profiledata.firstName,
//       lastName: profiledata.lastName,
//       phoneNumber: profiledata.phoneNumber,
//     },
//   }
//   const request = await fetch(API_ENDPOINT + `/api/users`, {
//     method: 'POST',
//     body: JSON.stringify(registerData),

//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//   const data = await request.json()

//   console.log(data)

//   return (dispatch: ThunkDispatch<any, any, Action>) =>
//     dispatch({
//       type: AuthActionTypes.REGISTER_USER,
//       payload: data,
//     })
// }

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions

export const registerAction = (profileData: UserProfile) =>
  action(AuthActionTypes.REGISTER_USER, profileData)

export const loginAction = (authData: { email: string; password: string }) =>
  action(AuthActionTypes.REQUEST_LOGIN, authData)

export const verifyAuthAction = (token: string) => action(AuthActionTypes.REQUEST_AUTH, token)
export const logoutAction = () => action(AuthActionTypes.REQUEST_LOGOUT)
//FROM THUNK ACTIONS
// export const login = () => action(AuthActionTypes.REQUEST_LOGIN)

// export const postRequest = (authData: UserProfile) => action(AuthActionTypes.REQUEST_LOGIN)
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.

export const loginSuccess = (data: AuthInfo) => action(AuthActionTypes.LOGIN_SUCCESS, data)
export const logoutSuccess = () => action(AuthActionTypes.LOGOUT_SUCCESS)
export const tokenSuccess = (data: AuthInfo) => action(AuthActionTypes.REQUEST_AUTH_SUCCESS, data)
export const fetchSuccess = (data: AuthInfo) => action(AuthActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(AuthActionTypes.FETCH_ERROR, message)
