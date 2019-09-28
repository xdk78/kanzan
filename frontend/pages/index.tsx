import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Header from '../containers/HeaderContainer'
import SubHeader from '../containers/SubHeaderContainer'
import { FeedWrapper, PostsWrapper, AppWrapper } from '../themes/styles'
import { RootState } from '../reducers'
import PostList from '../containers/PostsContainer'
import { WithAuthSync } from '../utils/auth'
import Reply from '../containers/ReplyContainer'

type IndexProps = {
  loggedIn: boolean
}

const Index: React.FunctionComponent<IndexProps> = ({ loggedIn }) => (
  <>
    <Head>
      <title>Feed - Kanzan</title>
    </Head>
    <AppWrapper>
      <Header loggedIn={loggedIn} />
      <SubHeader />
      <FeedWrapper>
        <PostsWrapper>
          {loggedIn && <Reply />}
          <PostList />
        </PostsWrapper>
      </FeedWrapper>
    </AppWrapper>
  </>
)

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  loggedIn: state.authState.loggedIn,
  token: state.authState.token
})

export default connect(mapStateToProps)(WithAuthSync(Index))
