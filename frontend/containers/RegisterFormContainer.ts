import { connect } from 'react-redux'
import { RootState, ThunkDispatch } from '../reducers'
import { registerUser } from '../actions/authActions'
import RegisterForm from '../components/RegisterForm'

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  loggedIn: state.authState.loggedIn
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  registerUser: (username: string, email: string, password: string) => {
    dispatch(registerUser(username, email, password))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm)
