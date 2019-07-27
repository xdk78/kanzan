import { PostsActions } from './postsActions'
import { AuthActions } from './authActions'
import { UserActions } from './userActions'

export type RootActions = PostsActions | AuthActions | UserActions
