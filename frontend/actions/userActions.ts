import { Action, ActionCreator } from 'redux'
import { User } from '../models'
import { ThunkResult } from '../reducers'
import apiClient from '../services/api'

export const FETCH_USER = 'FETCH_USER'

export interface FetchUser extends Action {
  type: 'FETCH_USER'
  payload: { user: User }
}

export const setUser: ActionCreator<FetchUser> = (user: User) => ({
  type: FETCH_USER,
  payload: { user }
})

/**
 * Returns User
 */
export const fetchUser = (username: string): ThunkResult<void> => async dispatch => {
  try {
    const { data } = await apiClient.get(`/user/${username}`)
    dispatch(setUser(data.data))
  } catch (error) {
    throw error
  }
}

export type UserActions = FetchUser
