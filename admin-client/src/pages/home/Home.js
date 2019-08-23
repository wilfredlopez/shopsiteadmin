import React, { Component } from "react"
import { Container } from "@material-ui/core"
import LoginForm from "../../components/LoginForm/LoginForm"

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Container>
            <div style={{ textAlign: "center" }}>
              <h1>Welcome!</h1>
              <p>Please log in to start working</p>
            </div>
            <LoginForm />
          </Container>
        </div>
      </React.Fragment>
    )
  }
}
