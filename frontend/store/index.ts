import { applyMiddleware, createStore, Store, Action, Middleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { rootReducer, RootState } from '../reducers'

/**
 * @param {RootState} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */
export default function(initialState: RootState, options): Store<RootState | undefined> {
  const middlewares: Middleware[] = [thunkMiddleware]
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares))
  return createStore<RootState | undefined, Action<any>, {}, {}>(rootReducer, initialState, enhancer)
}
