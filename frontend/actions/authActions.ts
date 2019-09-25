import { Action, ActionCreator } from 'redux'
import decode from 'jwt-decode'
import Router from 'next/router'
import { ThunkResult } from '../reducers'
import apiClient from '../services/api'
import cookies from '../utils/cookies'
import { isTokenExpired } from '../utils'
import User from '../models/User'

export const SET_REGISTERED = 'SET_REGISTERED'
export const SET_LOGGED_IN = 'SET_LOGGED_IN'

export interface SetRegisteredAction extends Action {
  type: 'SET_REGISTERED'
  payload: {}
}

export const setRegistered: ActionCreator<SetRegisteredAction> = () => ({
  type: SET_REGISTERED,
  payload: {}
})

export interface SetLoggedInAction extends Action {
  type: 'SET_LOGGED_IN'
  payload: { token: string; loggedIn: boolean; user: User }
}

export const setLoggedIn: ActionCreator<SetLoggedInAction> = (token, loggedIn, user) => ({
  type: SET_LOGGED_IN,
  payload: { token, loggedIn, user }
})

export const registerUser = (
  username: string,
  email: string,
  password: string
): ThunkResult<void> => async dispatch => {
  await apiClient.post('/auth/register', { username, email, password })

  dispatch(setRegistered())
}

export const setToken = (token: string): ThunkResult<void> => async dispatch => {
  if (isTokenExpired(token)) {
    dispatch(setLoggedIn(null, false, null))
  } else {
    const { username } = decode(token)
    dispatch(setLoggedIn(token, true, { username }))
  }
}

export const logoutUser = (): ThunkResult<void> => async dispatch => {
  cookies.destroy('token')

  dispatch(setLoggedIn(null, false, null))
  Router.push('/')
}

export const loginUser = (email: string, password: string): ThunkResult<void> => async dispatch => {
  const res = await apiClient.post('/auth/login', { email, password })
  const { token } = res.data.data
  const { username } = decode(token)

  cookies.set('token', token, {
    expires: 30 // one month
  })

  dispatch(setLoggedIn(token, true, { username }))
}

export type AuthActions = SetRegisteredAction | SetLoggedInAction
