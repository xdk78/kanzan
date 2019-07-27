import { connect } from 'react-redux'
import { RootState, ThunkDispatch } from '../reducers'
import { loginUser } from '../actions/authActions'
import LoginForm from '../components/LoginForm'

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  loggedIn: state.authState.loggedIn,
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  loginUser: (email: string, password: string) => {
    dispatch(loginUser(email, password))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
