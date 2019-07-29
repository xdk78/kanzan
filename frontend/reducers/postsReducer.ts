import { Reducer } from 'redux'
import { Post } from '../models'
import {
  PostsActions,
  INSERT_POST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_PENDING,
  FETCH_POSTS_ERROR
} from '../actions/postsActions'

export interface PostsState {
  readonly posts: Post[]
  readonly pending: boolean
  readonly error: any
}

const defaultState: PostsState = {
  posts: [],
  pending: false,
  error: null
}

export const postsReducer: Reducer<PostsState> = (state = defaultState, action: PostsActions) => {
  switch (action.type) {
    case FETCH_POSTS_PENDING: {
      return {
        ...state,
        pending: true
      }
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload.posts,
        pending: false
      }
    }
    case FETCH_POSTS_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        pending: false
      }
    }
    case INSERT_POST: {
      return {
        ...state,
        posts: [action.payload.post, ...state.posts]
      }
    }
    default:
      return state
  }
}
