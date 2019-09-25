import { Reducer } from 'redux'
import User from '../models/User'
import { FETCH_USER, UserActions } from '../actions/userActions'

export interface UserState {
  readonly user: User | any
}

const defaultState: UserState = {
  user: {}
}

export const userReducer: Reducer<UserState> = (state = defaultState, action: UserActions) => {
  switch (action.type) {
    case FETCH_USER: {
      return {
        ...state,
        user: action.payload.user
      }
    }
    default:
      return state
  }
}
