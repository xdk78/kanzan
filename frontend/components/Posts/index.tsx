import * as React from 'react'
import { Wrapper, LoaderWrapper } from './styles'
import PostComponent from '../Post'
import { Post } from '../../models'
import { Spinner } from '../shared'

interface IPostsProps {
  readonly posts: Post[]
  readonly fetchPosts: () => void
  readonly loggedIn: boolean
}

export default class Posts extends React.PureComponent<IPostsProps, {}> {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    const posts = this.props.posts

    return (
      <Wrapper role="feed" aria-busy="false">
        {/* <InfiniteScroll
          dataLength={this.props.posts.length}
          next={this.props.fetchPosts}
          hasMore={false}
          scrollThreshold={'200px'}
          loader={<div>Loading...</div>}
        > */}
        {posts.length > 0 ? (
          posts.map(p => <PostComponent key={p._id} post={p} />)
        ) : (
          <LoaderWrapper>
            <Spinner />
          </LoaderWrapper>
        )}
        {/* </InfiniteScroll> */}
      </Wrapper>
    )
  }
}
