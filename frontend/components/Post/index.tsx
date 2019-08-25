import * as React from 'react'
import { TopWrapper, Wrapper, Body, Title, PostDropdownMenu } from './styles'
import { Post as PostModel } from '../../models'
import richMarkdown from '../../utils/markdown'
import AuthorBar from '../AuthorBar'
import { Dropdown, DropdownIconButton } from '../Dropdown'
import { Spacer, IconButton, IconButtonWrapper, IconLinkButton, Spinner, LoaderWrapper } from '../shared'

interface PostProps {
  readonly post: PostModel
  readonly pending: boolean
  readonly error: any
  readonly deletePost: (id: string) => void
}

export default class PostComponent extends React.PureComponent<PostProps, {}> {
  state = {
    hidden: true,
    showPending: false
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

  handleDeletePost = (id: string) => () => {
    this.props.deletePost(id)
    if (this.dropdownRef.current) {
      this.setState({
        showPending: true
      })
    }
  }

  render() {
    const { post, pending, error } = this.props
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
            {pending && !error && this.state.showPending ? (
              <LoaderWrapper>
                <Spinner size="16px" />
              </LoaderWrapper>
            ) : (
              <>
                <DropdownIconButton className="material-icons" onClick={this.handleOpenCloseDropdown}>
                  more_vert
                </DropdownIconButton>
                <PostDropdownMenu hidden={this.state.hidden}>
                  <IconButtonWrapper color="#D50000" onClick={this.handleDeletePost(post._id)}>
                    <IconButton className="material-icons">delete</IconButton>
                    <IconLinkButton>Delete</IconLinkButton>
                  </IconButtonWrapper>
                </PostDropdownMenu>
              </>
            )}
          </Dropdown>
        </TopWrapper>
      </Wrapper>
    )
  }
}
