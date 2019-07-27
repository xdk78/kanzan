import { Wrapper, Username, Title, AvatarWrapper, LinkButton, DropdownButton, IconButton } from './styles'
import Avatar from '../Avatar'
import { Spacer } from '../shared'
import Link from 'next/link'
import * as React from 'react'
import { User } from '../../models'
import { DropdownMenu, Dropdown } from '../Dropdown'

interface IHeaderProps {
  readonly user: User
  readonly loggedIn: boolean
  readonly logout: () => void
  readonly fetchUser: (username: string) => void
}

interface IHeaderState {
  readonly hidden?: boolean
}

export default class Header extends React.PureComponent<IHeaderProps, IHeaderState> {
  state = {
    hidden: true
  }

  dropdownRef: React.RefObject<HTMLDivElement> = React.createRef()

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOpenCloseDropdown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOpenCloseDropdown, false)
  }

  handleOpenCloseDropdown = e => {
    if (this.dropdownRef.current && this.dropdownRef.current.contains(e.target)) {
      this.setState({
        hidden: false
      })
      return
    }

    this.setState({
      hidden: true
    })
  }

  render() {
    const { logout, user, loggedIn } = this.props
    return (
      <Wrapper role="navigation" aria-label="Main navigation">
        <Link href="/" passHref={true}>
          <Title role="menuitem">KANZAN</Title>
        </Link>
        <Spacer />

        {loggedIn ? (
          <>
            <AvatarWrapper role="menuitem">
              <Avatar />
              <Username>{user.username}</Username>
            </AvatarWrapper>
            <Dropdown ref={this.dropdownRef} role="menu">
              <IconButton className="material-icons" role="menuitem" onClick={this.handleOpenCloseDropdown}>
                more_vert
              </IconButton>
              <DropdownMenu hidden={this.state.hidden} role="menu">
                <DropdownButton role="menuitem" onClick={logout}>
                  Logout
                </DropdownButton>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <>
            <Link href="/register" passHref={true}>
              <LinkButton role="menuitem">Register</LinkButton>
            </Link>
            <Link href="/login" passHref={true}>
              <LinkButton role="menuitem">Log in</LinkButton>
            </Link>
          </>
        )}
      </Wrapper>
    )
  }
}
