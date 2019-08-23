import React, { Component } from "react"
import { TextField, Container, Button } from "@material-ui/core"
import "./login.scss"

export default class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: null,
      password: null,
    },
  }

  handleChange = e => {
    const { value, name } = e.target
    this.setState({
      [name]: value,
    })
  }

  setEmailError = message => {
    this.setState({
      ...this.state,
      errors: { ...this.state.errors, email: message },
    })
  }

  setPasswordError = message => {
    this.setState({
      ...this.state,
      errors: { ...this.state.errors, password: message },
    })
  }

  validateInputs = async () => {
    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    )
    if (!emailRegex.test(this.state.email)) {
      await this.setEmailError("Invalid Email")
    } else {
      await this.setState({
        ...this.state,
        errors: { ...this.state.errors, email: null },
      })
    }
    if (this.state.password.length < 3) {
      await this.setPasswordError("Password must have more than 3 characters")
    } else {
      await this.setState({
        ...this.state,
        errors: { ...this.state.errors, password: null },
      })
    }

    return this.state.errors.email || this.state.errors.password
  }

  handleSubmit = async e => {
    e.preventDefault()
    //validate inputs
    const error = await this.validateInputs()

    if (error) {
      return console.log("Errors Found")
    }

    //get token from server. and redirect if found
    console.log(this.state.email)
  }
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Container maxWidth="sm">
            <div className="form-control-w">
              <label>
                <strong>Email:</strong>
              </label>
              <TextField
                name="email"
                placeholder="Enter your email"
                variant="filled"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {this.state.errors.email && (
                <div className="login-error">{this.state.errors.email}</div>
              )}
            </div>

            <div className="form-control-w">
              <label>
                <strong>Password:</strong>
              </label>
              <TextField
                name="password"
                placeholder="Enter your password"
                variant="filled"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {this.state.errors.password && (
                <div className="login-error">{this.state.errors.password}</div>
              )}
            </div>
            <div>
              <Button type="submit" variant="outlined">
                Login
              </Button>
            </div>
          </Container>
        </form>
      </React.Fragment>
    )
  }
}
