import * as React from 'react'
import { Wrapper, LoaderWrapper } from './styles'
import PostComponent from '../Post'
import { Post } from '../../models'
import { Spinner } from '../shared'

interface IPostsProps {
  readonly posts: Post[]
  readonly pending: boolean
  readonly error: any
  readonly fetchPosts: () => void
  readonly loggedIn: boolean
}

export default class Posts extends React.PureComponent<IPostsProps, {}> {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    const { posts, pending, error } = this.props

    if (pending && !error) {
      return (
        <Wrapper role="feed" aria-busy="false">
          <LoaderWrapper>
            <Spinner />
          </LoaderWrapper>
        </Wrapper>
      )
    } else if (!pending && !error) {
      return (
        <Wrapper role="feed" aria-busy="false">
          {posts.length > 0 && posts.map(p => <PostComponent key={p._id} post={p} />)}
        </Wrapper>
      )
    } else if (error) {
      return (
        <Wrapper role="feed" aria-busy="false">
          <div>{error}</div>
        </Wrapper>
      )
    }
  }
}
