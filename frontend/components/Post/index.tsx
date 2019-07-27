import * as React from 'react'
import { TopWrapper, Wrapper, Body, Title } from './styles'
import { Post as PostModel } from '../../models'
import richMarkdown from '../../utils/markdown'
import AuthorBar from '../AuthorBar'

interface IPostProps {
  readonly post: PostModel
}

export default class PostComponent extends React.PureComponent<IPostProps, {}> {
  render() {
    const post = this.props.post
    return (
      <Wrapper>
        <Title>{post.title}</Title>
        <TopWrapper>
          <Body>{richMarkdown(post.content)}</Body>
        </TopWrapper>
        <AuthorBar createdAt={post.createdAt} author={post.author} />
      </Wrapper>
    )
  }
}
