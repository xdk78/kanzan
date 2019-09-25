import React from 'react'
import Head from 'next/head'
import LoginFormContainer from '../containers/LoginFormContainer'
import Header from '../containers/HeaderContainer'
import SubHeader from '../containers/SubHeaderContainer'
import { AppWrapper } from '../themes/styles'

const Login = ({}) => (
  <>
    <Head>
      <title>Log in - Kanzan</title>
    </Head>
    <AppWrapper>
      <Header />
      <SubHeader />
      <LoginFormContainer />
    </AppWrapper>
  </>
)

export default Login
