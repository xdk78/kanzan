import React, { useEffect } from 'react'
import { Wrapper } from './styles'
import PostComponent from '../../containers/PostContainer'
import Post from '../../models/Post'
import { Spinner, LoaderWrapper } from '../shared'
// import InfiniteScroll from 'react-infinite-scroll-component'

type PostsProps = {
  posts: Post[]
  pending: boolean
  hasMore: boolean
  page: number
  pages: number
  error: any
  fetchPosts: () => void
  setPostsPage: (page: number) => void
  setPostsHasReachedEnd: (hasReachedEnd: boolean) => void
  loggedIn: boolean
}

const Posts = ({ posts, pending, error, fetchPosts }: PostsProps) => {
  useEffect(() => {
    fetchPosts()
  }, [])

  // handleNext = () => {
  //   setPostsPage(page + 1)
  //   setPostsHasReachedEnd(pages !== page)
  //   fetchPosts()
  // }

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

export default Posts
