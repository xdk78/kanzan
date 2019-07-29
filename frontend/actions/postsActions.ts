import { Action, ActionCreator } from 'redux'
import { Post } from '../models'
import { ThunkResult } from '../reducers'
import apiClient from '../services/api'

export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR'

export const INSERT_POST = 'INSERT_POST'

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
  payload: { error: any }
}

export const fetchPostsError: ActionCreator<FetchPostsError> = (error: any) => ({
  type: FETCH_POSTS_ERROR,
  payload: { error }
})

export interface FetchPosts extends Action {
  type: 'FETCH_POSTS'
  payload: { posts: Post[] }
}

export interface InsertPost extends Action {
  type: 'INSERT_POST'
  payload: { post: Post }
}

export const insertPost: ActionCreator<InsertPost> = (post: Post) => ({
  type: INSERT_POST,
  payload: { post }
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
    dispatch(fetchPostsError(error))
    throw error
  }
}

/**
 * Sends post with `title` and `content` and returns created
 */
export const sendPost = (title: string, content: string): ThunkResult<void> => async (dispatch, getState) => {
  try {
    const body = { title, content }

    const { data } = await apiClient.post('/posts', body, {
      headers: { Authorization: `Bearer ${getState().authState.token}` }
    })
    const post = data.data

    dispatch(insertPost(post))
  } catch (error) {
    throw error
  }
}

export type PostsActions = FetchPostsPending | FetchPostsSuccess | FetchPostsError | InsertPost
