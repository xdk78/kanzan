import { connect } from 'react-redux'
import { RootState, ThunkDispatch } from '../reducers'
import Posts from '../components/Posts'
import { fetchPosts } from '../actions/postsActions'

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  posts: state.postsState.posts
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
