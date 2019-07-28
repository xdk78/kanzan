import * as React from 'react'
import { TopWrapper, Wrapper, Body, Title } from './styles'
import { Post as PostModel } from '../../models'
import richMarkdown from '../../utils/markdown'
import AuthorBar from '../AuthorBar'
import { DropdownMenu, Dropdown, DropdownIconButton } from '../Dropdown'
import { Spacer, IconButton, IconButtonWrapper, IconLinkButton } from '../shared'

interface IPostProps {
  readonly post: PostModel
}

export default class PostComponent extends React.PureComponent<IPostProps, {}> {
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
    const post = this.props.post
    return (
      <Wrapper>
        <Title>{post.title}</Title>
        <TopWrapper>
          <Body>{richMarkdown(post.content)}</Body>
        </TopWrapper>
        <TopWrapper>
          <AuthorBar createdAt={post.createdAt} author={post.author} />
          <Spacer />
          <Dropdown ref={this.dropdownRef}>
            <DropdownIconButton className="material-icons" onClick={this.handleOpenCloseDropdown}>
              more_vert
            </DropdownIconButton>
            <DropdownMenu hidden={this.state.hidden}>
              <IconButtonWrapper color="#D50000">
                <IconButton className="material-icons">delete</IconButton>
                <IconLinkButton>Delete</IconLinkButton>
              </IconButtonWrapper>
            </DropdownMenu>
          </Dropdown>
        </TopWrapper>
      </Wrapper>
    )
  }
}
