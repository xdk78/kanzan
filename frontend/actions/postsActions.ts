import { Action, ActionCreator } from 'redux'
import { Post } from '../models'
import { ThunkResult } from '../reducers'
import apiClient from '../services/api'

export const FETCH_POSTS = 'FETCH_POSTS'

export interface FetchPosts extends Action {
  type: 'FETCH_POSTS'
  payload: { posts: Post[] }
}

export const setPosts: ActionCreator<FetchPosts> = (posts: Post[]) => ({
  type: FETCH_POSTS,
  payload: { posts }
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

export type PostsActions = FetchPosts
