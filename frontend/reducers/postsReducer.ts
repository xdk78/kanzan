import { Reducer } from 'redux'
import { Post } from '../models'
import { FETCH_POSTS, PostsActions, INSERT_POST } from '../actions/postsActions'

export interface PostsState {
  readonly posts: Post[]
}

const defaultState: PostsState = {
  posts: []
}

export const postsReducer: Reducer<PostsState> = (state = defaultState, action: PostsActions) => {
  switch (action.type) {
    case FETCH_POSTS: {
      return {
        ...state,
        posts: action.payload.posts
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
