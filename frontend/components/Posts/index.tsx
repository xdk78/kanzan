import * as React from 'react'
import { Wrapper } from './styles'
import PostComponent from '../../containers/PostContainer'
import { Post } from '../../models'
import { Spinner, LoaderWrapper } from '../shared'
// import InfiniteScroll from 'react-infinite-scroll-component'

interface IPostsProps {
  readonly posts: Post[]
  readonly pending: boolean
  readonly hasMore: boolean
  readonly page: number
  readonly pages: number
  readonly error: any
  readonly fetchPosts: () => void
  readonly setPostsPage: (page: number) => void
  readonly setPostsHasReachedEnd: (hasReachedEnd: boolean) => void
  readonly loggedIn: boolean
}

export default class Posts extends React.PureComponent<IPostsProps, {}> {
  componentDidMount() {
    this.props.fetchPosts()
  }

  // handleNext = () => {
  //   this.props.setPostsPage(this.props.page + 1)
  //   this.props.setPostsHasReachedEnd(this.props.pages !== this.props.page)
  //   this.props.fetchPosts()
  // }

  render() {
    const { posts, pending, error, hasMore } = this.props

    return (
      <Wrapper role="feed" aria-busy="true">
        {pending && !error ? (
          <LoaderWrapper>
            <Spinner />
          </LoaderWrapper>
        ) : error ? (
          <div>{error}</div>
        ) : (
          posts.length > 0 && posts.map(p => <PostComponent key={p._id} post={p} />)
        )}

        {/* {posts.length > 0 && (
          <InfiniteScroll
            dataLength={posts.length}
            next={this.props.fetchPosts}
            hasMore={hasMore}
            scrollThreshold={'200px'}
            loader={
              <LoaderWrapper>
                <Spinner />
              </LoaderWrapper>
            }
          >
            {posts.map(p => (
              <PostComponent key={p._id} post={p} />
            ))}
          </InfiniteScroll>
        )} */}
      </Wrapper>
    )
  }
}
