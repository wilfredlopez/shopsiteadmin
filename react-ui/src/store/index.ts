import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import heroesSaga from './heroes/sagas'
import { heroesReducer } from './heroes/reducer'
import { HeroesState } from './heroes/types'
import teamsSaga from './products/sagas'
import { ProductsState } from './products/types'
import { productsReducer } from './products/reducer'
import authSaga from './auth/sagas'
import { AuthReducer } from './auth/reducer'
import { AuthState } from './auth/types'

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = (history: History) =>
  combineReducers({
    auth: AuthReducer,
    heroes: heroesReducer,
    products: productsReducer,
    router: connectRouter(history),
  })

// The top-level state object
export interface ApplicationState {
  heroes: HeroesState
  products: ProductsState
  router: RouterState
  auth: AuthState
}

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all([fork(heroesSaga), fork(teamsSaga), fork(authSaga)])
}
