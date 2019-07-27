import { combineReducers } from 'redux'
import { RootActions } from '../actions'
import { authReducer, AuthState } from './authReducer'

import { RootState } from './index'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { postsReducer, PostsState } from './postsReducer'
import { userReducer, UserState } from './userReducer'

export interface RootState {
  postsState: PostsState
  authState: AuthState
  userState: UserState
}

export type ThunkResult<R> = ThunkAction<R, RootState, null, RootActions>

export type ThunkDispatch = ThunkDispatch<RootState, null, RootActions>

export const rootReducer = combineReducers<RootState | undefined>({
  postsState: postsReducer,
  authState: authReducer,
  userState: userReducer
})
