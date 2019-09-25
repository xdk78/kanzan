import { Action, ActionCreator } from 'redux'
import Post from '../models/Post'
import { ThunkResult } from '../reducers'
import apiClient from '../services/api'

export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR'

export const SET_POSTS_PAGE = 'SET_POSTS_PAGE'
export const SET_POSTS_HAS_REACHED_END = 'SET_POSTS_HAS_REACHED_END'

export const INSERT_POST_PENDING = 'INSERT_POST_PENDING'
export const INSERT_POST_SUCCESS = 'INSERT_POST_SUCCESS'
export const INSERT_POST_ERROR = 'INSERT_POST_ERROR'

export const DELETE_POST_PENDING = 'DELETE_POST_PENDING'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR'

export interface FetchPostsPending extends Action {
  type: 'FETCH_POSTS_PENDING'
}

export const fetchPostsPending: ActionCreator<FetchPostsPending> = () => ({
  type: FETCH_POSTS_PENDING
})

export interface FetchPostsSuccess extends Action {
  type: 'FETCH_POSTS_SUCCESS'
  payload: { posts: Post[]; pages: number }
}

export const fetchPostsSuccess: ActionCreator<FetchPostsSuccess> = (posts: Post[], pages: number) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts, pages }
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

export interface DeletePostPending extends Action {
  type: 'DELETE_POST_PENDING'
}

export const deletePostPending: ActionCreator<DeletePostPending> = () => ({
  type: DELETE_POST_PENDING
})

export interface DeletePostSuccess extends Action {
  type: 'DELETE_POST_SUCCESS'
  payload: { id: string }
}

export const deletePostSuccess: ActionCreator<DeletePostSuccess> = (id: string) => ({
  type: DELETE_POST_SUCCESS,
  payload: { id }
})

export interface DeletePostError extends Action {
  type: 'DELETE_POST_ERROR'
  payload: { deletePostError: any }
}

export const deletePostError: ActionCreator<DeletePostError> = (deletePostError: any) => ({
  type: DELETE_POST_ERROR,
  payload: { deletePostError }
})

export interface SetPostsPage extends Action {
  type: 'SET_POSTS_PAGE'
  payload: { page: number }
}

export const setPostsPage: ActionCreator<SetPostsPage> = (page: number) => ({
  type: SET_POSTS_PAGE,
  payload: { page }
})

export interface SetPostsHasReachedEnd extends Action {
  type: 'SET_POSTS_HAS_REACHED_END'
  payload: { hasReachedEnd: boolean }
}

export const setPostsHasReachedEnd: ActionCreator<SetPostsHasReachedEnd> = (hasReachedEnd: boolean) => ({
  type: SET_POSTS_HAS_REACHED_END,
  payload: { hasReachedEnd }
})

/**
 * Returns posts
 */
export const fetchPosts = (): ThunkResult<void> => async (dispatch, getState) => {
  try {
    dispatch(fetchPostsPending())
    const { data } = await apiClient.get(`/posts?page=${getState().postsState.page}`)
    dispatch(fetchPostsSuccess(data.data, data.pages))
  } catch (error) {
    dispatch(fetchPostsError(error.toString()))
    throw error
  }
}

// export const fetchPosts = (): ThunkResult<void> => async (dispatch, getState) => {
//   try {
//     dispatch(fetchPostsPending())
//     const { data } = await apiClient.get(`/posts?page=${getState().postsState.page}`)
//     dispatch(fetchPostsSuccess(data.data))
//     dispatch(setPostsPage(getState().postsState.page + 1))
//     dispatch(setPostsHasReachedEnd(data.pages !== getState().postsState.page))
//   } catch (error) {
//     dispatch(fetchPostsError(error.toString()))
//     throw error
//   }
// }

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

/**
 * Deletes post for given `id`
 */
export const deletePost = (id: string): ThunkResult<void> => async (dispatch, getState) => {
  try {
    dispatch(deletePostPending())

    await apiClient.delete(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${getState().authState.token}` }
    })

    dispatch(deletePostSuccess(id))
  } catch (error) {
    dispatch(deletePostError(error.toString()))
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
  | DeletePostPending
  | DeletePostSuccess
  | DeletePostError
  | SetPostsPage
  | SetPostsHasReachedEnd
