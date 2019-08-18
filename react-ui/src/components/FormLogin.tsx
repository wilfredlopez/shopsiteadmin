import * as React from 'react'
import LoginView, { Values } from './LoginForm'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginAction } from '../store/auth/actions'
import { ApplicationState } from '../store'
import { AuthState } from '../store/auth/types'

interface IProps {
  auth: AuthState
}

interface IReduxProps {
  loginAction: (e: Values) => void
}

class LoginRegister extends React.Component<IProps & IReduxProps> {
  handleFormSubmit = async (e: Values) => {
    this.props.loginAction(e)
    return null
  }
  render() {
    if (this.props.auth.data.isAuth) {
      return <Redirect to="/" />
    }
    return <LoginView submit={this.handleFormSubmit} />
  }
}

function mapStateToProps(state: ApplicationState) {
  return {
    auth: state.auth,
  }
}

export default connect(
  mapStateToProps,
  { loginAction },
)(LoginRegister)
