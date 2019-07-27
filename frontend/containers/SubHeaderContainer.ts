import { connect } from 'react-redux'
import { RootState, ThunkDispatch } from '../reducers'
import SubHeader from '../components/SubHeader'

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  loggedIn: state.authState.loggedIn,
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubHeader)
