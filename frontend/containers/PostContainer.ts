import { connect } from 'react-redux'
import { RootState, ThunkDispatch } from '../reducers'
import Post from '../components/Post'
import { deletePost } from '../actions/postsActions'

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  pending: state.postsState.deletePostPending,
  error: state.postsState.deletePostError
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  deletePost: (id: string) => {
    dispatch(deletePost(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
