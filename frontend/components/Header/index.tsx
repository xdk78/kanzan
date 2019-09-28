import Link from 'next/link'
import React from 'react'
import { Wrapper, Username, Title, AvatarWrapper, LinkButton, DropdownButton, IconButton } from './styles'
import Avatar from '../Avatar'
import { Spacer } from '../shared'
import User from '../../models/User'
import { DropdownMenu, Dropdown } from '../Dropdown'

type HeaderProps = {
  user: User
  loggedIn: boolean
  logout: () => void
  fetchUser: (username: string) => void
}

type HeaderState = {
  hidden?: boolean
}

export default class Header extends React.PureComponent<HeaderProps, HeaderState> {
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
        <Link href="/" passHref>
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
            <Link href="/register" passHref>
              <LinkButton role="menuitem">Register</LinkButton>
            </Link>
            <Link href="/login" passHref>
              <LinkButton role="menuitem">Log in</LinkButton>
            </Link>
          </>
        )}
      </Wrapper>
    )
  }
}
