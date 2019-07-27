import * as React from 'react'
import { Wrapper, FormCard, Input, FormButton } from '../Form'
import Link from 'next/link'

interface IRegisterFormState {
  readonly username: string
  readonly email: string
  readonly password: string
}

interface IRegisterFormProps {
  readonly token: string
  readonly registerUser: (username: string, email: string, password: string) => void
}

export default class RegisterForm extends React.PureComponent<IRegisterFormProps, IRegisterFormState> {
  state = {
    username: '',
    email: '',
    password: ''
  }

  handleChange = event => {
    switch (event.target.name) {
      case 'username':
        this.setState({ username: event.target.value })
        break
      case 'password':
        this.setState({ password: event.target.value })
        break
      case 'email':
        this.setState({ email: event.target.value })
        break
      default:
        break
    }
  }

  handleSubmit = (event: React.SyntheticEvent) => {
    this.props.registerUser(this.state.username, this.state.email, this.state.password)
    event.preventDefault()
  }

  render() {
    if (!this.props.token) {
      return (
        <Wrapper>
          <FormCard onSubmit={this.handleSubmit}>
            Join today!
            <Input
              name="email"
              value={this.state.email}
              placeholder="email"
              type="email"
              onChange={this.handleChange}
              required={true}
            />
            <Input
              name="username"
              placeholder="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              required={true}
            />
            <Input
              name="password"
              placeholder="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              required={true}
            />
            <FormButton type="submit" value="Register" onSubmit={this.handleSubmit} />
          </FormCard>
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        <Link href="/login">
          <a>LOG IN</a>
        </Link>
      </Wrapper>
    )
  }
}