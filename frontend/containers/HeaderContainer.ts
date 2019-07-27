import { connect } from 'react-redux'
import { RootState, ThunkDispatch } from '../reducers'
import { logoutUser } from '../actions/authActions'
import { fetchUser } from '../actions/userActions'
import Header from '../components/Header'

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  loggedIn: state.authState.loggedIn,
  user: state.authState.user
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  logout: () => dispatch(logoutUser()),
  fetchUser: username => {
    dispatch(fetchUser(username))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
