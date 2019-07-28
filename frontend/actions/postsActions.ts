import { Action, ActionCreator } from 'redux'
import { Post } from '../models'
import { ThunkResult } from '../reducers'
import apiClient from '../services/api'

export const FETCH_POSTS = 'FETCH_POSTS'
export const SEND_POST = 'SEND_POST'

export interface FetchPosts extends Action {
  type: 'FETCH_POSTS'
  payload: { posts: Post[] }
}

export const setPosts: ActionCreator<FetchPosts> = (posts: Post[]) => ({
  type: FETCH_POSTS,
  payload: { posts }
})

export interface SendPost extends Action {
  type: 'SEND_POST'
  payload: { title: string; content: string }
}

export const setPost: ActionCreator<SendPost> = (title: string, content: string) => ({
  type: SEND_POST,
  payload: { title, content }
})

/**
 * Returns posts
 */
export const fetchPosts = (): ThunkResult<void> => async dispatch => {
  try {
    const { data } = await apiClient.get(`/posts`)
    dispatch(setPosts(data.data))
  } catch (error) {
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

    dispatch(setPost(data.data))
  } catch (error) {
    throw error
  }
}

export type PostsActions = FetchPosts | SendPost
