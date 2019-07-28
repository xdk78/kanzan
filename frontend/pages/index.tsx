import * as React from 'react'
import Header from './../containers/HeaderContainer'
import SubHeader from './../containers/SubHeaderContainer'
import { connect } from 'react-redux'
import { FeedWrapper, PostsWrapper, AppWrapper } from '../themes/styles'
import { RootState } from '../reducers'
import PostList from '../containers/PostsContainer'
import { WithAuthSync } from '../utils/auth'
import Head from 'next/head'
import Reply from '../containers/ReplyContainer'

interface IIndexProps {
  readonly loggedIn: boolean
  readonly token: string
}

const Index: React.FunctionComponent<IIndexProps> = ({ loggedIn, token }) => (
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
