import { connect } from 'react-redux'
import { RootState, ThunkDispatch } from '../reducers'
import Posts from '../components/Posts'
import { fetchPosts } from '../actions/postsActions'

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  posts: state.postsState.posts,
  pending: state.postsState.pendingPosts,
  error: state.postsState.postsError
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  fetchPosts: () => {
    dispatch(fetchPosts())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
