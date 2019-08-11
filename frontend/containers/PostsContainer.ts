import { connect } from 'react-redux'
import { RootState, ThunkDispatch } from '../reducers'
import Posts from '../components/Posts'
import { fetchPosts, setPostsPage, setPostsHasReachedEnd } from '../actions/postsActions'

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  posts: state.postsState.posts,
  pending: state.postsState.pendingPosts,
  error: state.postsState.postsError,
  hasMore: state.postsState.hasReachedEnd,
  page: state.postsState.page,
  pages: state.postsState.pages
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  setPostsPage: (page: number) => {
    dispatch(setPostsPage(page))
  },
  setPostsHasReachedEnd: (hasReachedEnd: boolean) => {
    dispatch(setPostsHasReachedEnd(hasReachedEnd))
  },
  fetchPosts: () => {
    dispatch(fetchPosts())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
