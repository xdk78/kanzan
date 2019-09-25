import { Reducer } from 'redux'
import { SET_REGISTERED, SET_LOGGED_IN, AuthActions } from '../actions/authActions'
import User from '../models/User'

export interface AuthState {
  readonly token: string
  readonly loggedIn: boolean
  readonly user: User
}

const initialState: AuthState = {
  token: null,
  loggedIn: false,
  user: null
}

export const authReducer: Reducer<AuthState> = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case SET_REGISTERED: {
      return {
        ...state,
        loggedIn: false,
        user: null
      }
    }
    case SET_LOGGED_IN: {
      return {
        ...state,
        token: action.payload.token,
        loggedIn: action.payload.loggedIn,
        user: action.payload.user
      }
    }
    default:
      return state
  }
}
