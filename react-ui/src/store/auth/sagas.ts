import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { AuthActionTypes } from './types'
import {
  fetchError,
  // fetchSuccess,
  loginAction,
  loginSuccess,
  verifyAuthAction,
  tokenSuccess,
  logoutSuccess,
  registerAction,
} from './actions'
// import { UserProfile } from 'src/api_types/ShopAppTypes'
import { callApi } from '../../utils/api'
// import { UserProfile } from '../../api_types/ShopAppTypes'
import config from '../../config/index'

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'
const API_ENDPOINT = config.API_ENDPOINT

function* isAuth(action: ReturnType<typeof verifyAuthAction>) {
  try {
    // To call async functions, use redux-saga's `call()`.

    const res = yield call(callApi, 'get', API_ENDPOINT, `/users/verify/${action.payload}`)

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(tokenSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

async function getLoginData(logindata: any) {
  const request = await fetch(API_ENDPOINT + `/api/users/login`, {
    method: 'POST',
    body: JSON.stringify(logindata),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await request.json()
}

async function getRegisterData(registerData: any) {
  const request = await fetch(API_ENDPOINT + `/api/users/`, {
    method: 'POST',
    body: JSON.stringify(registerData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await request.json()
}
function* login(action: ReturnType<typeof loginAction>) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield getLoginData(action.payload)

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(loginSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* register(action: ReturnType<typeof registerAction>) {
  const registerData = {
    email: action.payload.email,
    password: action.payload.password,
    profile: {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      phoneNumber: action.payload.phoneNumber,
    },
  }
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield getRegisterData(registerData)

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(loginSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* logout() {
  yield localStorage.removeItem('authToken')
  yield put(logoutSuccess())
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchLoginRequest() {
  yield takeEvery(AuthActionTypes.REQUEST_LOGIN, login)
}

function* watchRegisterRequest() {
  yield takeEvery(AuthActionTypes.REGISTER_USER, register)
}

function* watchIsAuth() {
  yield takeEvery(AuthActionTypes.REQUEST_AUTH, isAuth)
}

function* watchLogout() {
  yield takeEvery(AuthActionTypes.REQUEST_LOGOUT, logout)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* authSaga() {
  yield all([
    fork(watchLoginRequest),
    fork(watchIsAuth),
    fork(watchLogout),
    fork(watchRegisterRequest),
  ])
}

export default authSaga
