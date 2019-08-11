import { Reducer } from 'redux'
import { Post } from '../models'
import {
  PostsActions,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_PENDING,
  FETCH_POSTS_ERROR,
  INSERT_POST_PENDING,
  INSERT_POST_SUCCESS,
  INSERT_POST_ERROR,
  SET_POSTS_HAS_REACHED_END
} from '../actions/postsActions'

export interface PostsState {
  readonly posts: Post[]
  readonly page: number
  readonly pages: number
  readonly hasReachedEnd: boolean
  readonly pendingPosts: boolean
  readonly insertPendingPost: boolean
  readonly postsError: any
  readonly insertPostError: any
}

const defaultState: PostsState = {
  posts: [],
  page: 1,
  pages: 1,
  hasReachedEnd: false,
  pendingPosts: false,
  insertPendingPost: false,
  postsError: null,
  insertPostError: null
}

export const postsReducer: Reducer<PostsState> = (state = defaultState, action: PostsActions) => {
  switch (action.type) {
    case SET_POSTS_HAS_REACHED_END:
      return {
        ...state,
        hasReachedEnd: action.payload.hasReachedEnd
      }
    case FETCH_POSTS_PENDING: {
      return {
        ...state,
        pendingPosts: true
      }
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload.posts,
        pages: action.payload.pages,
        pendingPosts: false
      }
    }
    case FETCH_POSTS_ERROR: {
      return {
        ...state,
        postsError: action.payload.postsError,
        pendingPosts: false
      }
    }
    case INSERT_POST_PENDING: {
      return {
        ...state,
        insertPendingPost: true
      }
    }
    case INSERT_POST_SUCCESS: {
      return {
        ...state,
        posts: [action.payload.post, ...state.posts],
        insertPendingPost: false
      }
    }
    case INSERT_POST_ERROR: {
      return {
        ...state,
        insertPostError: action.payload.insertPostError,
        insertPendingPost: false
      }
    }
    default:
      return state
  }
}
