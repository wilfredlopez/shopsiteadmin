import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { ProductsActionTypes } from './types'
import {
  fetchError,
  fetchSuccess,
  selectProduct,
  productSelected,
  fetchRequest,
  selectSubCategory,
} from './actions'
import { callApi } from '../../utils/api'
import config from '../../config/index'

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'
const API_ENDPOINT = config.API_ENDPOINT

function* handleFetch(action: ReturnType<typeof fetchRequest>) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', API_ENDPOINT, `/products/category/${action.payload}`)

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res.products))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* handleSelectSub(action: ReturnType<typeof selectSubCategory>) {
  try {
    console.log(action.payload)
    const products = yield call(
      callApi,
      'get',
      API_ENDPOINT,
      `/products/category/${action.payload}`,
    )

    if (products.error) {
      yield put(fetchError(products.error))
    } else {
      yield put(fetchSuccess(products.products))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}
function* handleSelect(action: ReturnType<typeof selectProduct>) {
  try {
    //products/category/Men?perPage=3
    // const detail = yield call(callApi, 'get', API_ENDPOINT, `/teams/${action.payload}`)
    const products = yield call(
      callApi,
      'get',
      API_ENDPOINT,
      `/products/category/${action.payload}`,
    )

    if (products.error) {
      yield put(fetchError(products.error))
    } else {
      yield put(productSelected(products.products))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(ProductsActionTypes.FETCH_REQUEST, handleFetch)
}

function* watchSelectTeam() {
  yield takeLatest(ProductsActionTypes.SELECT_PRODUCTS, handleSelect)
}

function* watchSelectSub() {
  yield takeLatest(ProductsActionTypes.SELECT_SUBCATEGORY, handleSelectSub)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* heroesSaga() {
  yield all([fork(watchFetchRequest), fork(watchSelectTeam), fork(watchSelectSub)])
}

export default heroesSaga
