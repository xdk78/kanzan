import { connect } from 'react-redux'
import { RootState } from '../reducers'
import SubHeader from '../components/SubHeader'

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  loggedIn: state.authState.loggedIn
})

export default connect(mapStateToProps)(SubHeader)
