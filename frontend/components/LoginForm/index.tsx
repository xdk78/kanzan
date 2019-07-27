import * as React from 'react'
import { Wrapper, FormCard, Input, FormButton } from '../Form'
import Link from 'next/link'

interface ILoginFormState {
  readonly email: string
  readonly password: string
}

interface ILoginFormProps {
  readonly loggedIn: boolean
  readonly loginUser: (email: string, password: string) => void
}

export default class LoginForm extends React.PureComponent<ILoginFormProps, ILoginFormState> {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    switch (event.target.name) {
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
    this.props.loginUser(this.state.email, this.state.password)
    event.preventDefault()
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <Wrapper>
          <FormCard onSubmit={this.handleSubmit}>
            Welcome back!
            <Input
              name="email"
              value={this.state.email}
              placeholder="email"
              type="email"
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
            <FormButton type="submit" value="Log in" onSubmit={this.handleSubmit} />
          </FormCard>
        </Wrapper>
      )
    }
    return (
      <Link href="/">
        <a>Hi, Go back to home page</a>
      </Link>
    )
  }
}
