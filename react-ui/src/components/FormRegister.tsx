import * as React from 'react'
import RegisterView from './MyForm'
// import { ConnectedReduxProps } from 'src/store'
import { connect } from 'react-redux'
import { registerAction } from '../store/auth/actions'
import { UserProfile } from '../api_types/ShopAppTypes'
import { ApplicationState } from '../store'
import { AuthState } from '../store/auth/types'
import { Redirect } from 'react-router-dom'

interface IProps {}

interface IReduxProps {
  auth: AuthState
  registerAction: (e: UserProfile) => void
}

class FormRegister extends React.Component<IProps & IReduxProps> {
  handleFormSubmit = async (e: UserProfile) => {
    this.props.registerAction(e)

    return null
  }
  render() {
    if (this.props.auth.data.isAuth) {
      return <Redirect to="/" />
    }
    return <RegisterView submit={this.handleFormSubmit} />
  }
}

function mapStateToProps(state: ApplicationState) {
  return {
    auth: state.auth,
  }
}

export default connect(
  mapStateToProps,
  { registerAction },
)(FormRegister)
