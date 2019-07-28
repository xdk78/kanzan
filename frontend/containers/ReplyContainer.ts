import { connect } from 'react-redux'
import { RootState, ThunkDispatch } from '../reducers'
import Reply from '../components/Reply'
import { sendPost } from '../actions/postsActions'

const mapStateToProps = (state: RootState, props) => ({
  ...props
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  sendPost: (title: string, content: string) => {
    dispatch(sendPost(title, content))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reply)
