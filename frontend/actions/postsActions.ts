import { Action, ActionCreator } from 'redux'
import { Post } from '../models'
import { ThunkResult } from '../reducers'
import apiClient from '../services/api'

export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR'

export const INSERT_POST_PENDING = 'INSERT_POST_PENDING'
export const INSERT_POST_SUCCESS = 'INSERT_POST_SUCCESS'
export const INSERT_POST_ERROR = 'INSERT_POST_ERROR'

export interface FetchPostsPending extends Action {
  type: 'FETCH_POSTS_PENDING'
}

export const fetchPostsPending: ActionCreator<FetchPostsPending> = () => ({
  type: FETCH_POSTS_PENDING
})

export interface FetchPostsSuccess extends Action {
  type: 'FETCH_POSTS_SUCCESS'
  payload: { posts: Post[] }
}

export const fetchPostsSuccess: ActionCreator<FetchPostsSuccess> = (posts: Post[]) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts }
})

export interface FetchPostsError extends Action {
  type: 'FETCH_POSTS_ERROR'
  payload: { postsError: any }
}

export const fetchPostsError: ActionCreator<FetchPostsError> = (postsError: any) => ({
  type: FETCH_POSTS_ERROR,
  payload: { postsError }
})

export interface FetchPosts extends Action {
  type: 'FETCH_POSTS'
  payload: { posts: Post[] }
}

export interface InsertPostPending extends Action {
  type: 'INSERT_POST_PENDING'
}

export const insertPostPending: ActionCreator<InsertPostPending> = () => ({
  type: INSERT_POST_PENDING
})

export interface InsertPostSuccess extends Action {
  type: 'INSERT_POST_SUCCESS'
  payload: { post: Post }
}

export const insertPostSuccess: ActionCreator<InsertPostSuccess> = (post: Post) => ({
  type: INSERT_POST_SUCCESS,
  payload: { post }
})

export interface InsertPostError extends Action {
  type: 'INSERT_POST_ERROR'
  payload: { insertPostError: any }
}

export const insertPostError: ActionCreator<InsertPostError> = (insertPostError: any) => ({
  type: INSERT_POST_ERROR,
  payload: { insertPostError }
})

/**
 * Returns posts
 */
export const fetchPosts = (): ThunkResult<void> => async dispatch => {
  try {
    dispatch(fetchPostsPending())
    const { data } = await apiClient.get(`/posts`)
    dispatch(fetchPostsSuccess(data.data))
  } catch (error) {
    dispatch(fetchPostsError(error.toString()))
    throw error
  }
}

/**
 * Sends post with `title` and `content` and returns created
 */
export const sendPost = (title: string, content: string): ThunkResult<void> => async (dispatch, getState) => {
  try {
    dispatch(insertPostPending())
    const body = { title, content }

    const { data } = await apiClient.post('/posts', body, {
      headers: { Authorization: `Bearer ${getState().authState.token}` }
    })
    const post = data.data

    dispatch(insertPostSuccess(post))
  } catch (error) {
    dispatch(insertPostError(error.toString()))
    throw error
  }
}

export type PostsActions =
  | FetchPostsPending
  | FetchPostsSuccess
  | FetchPostsError
  | InsertPostPending
  | InsertPostSuccess
  | InsertPostError
