import * as React from 'react'
import Head from 'next/head'
import RegisterFormContainer from '../containers/RegisterFormContainer'
import Header from '../containers/HeaderContainer'
import SubHeader from '../containers/SubHeaderContainer'
import { AppWrapper } from '../themes/styles'

const Register = () => (
  <>
    <Head>
      <title>Register - Kanzan</title>
    </Head>
    <AppWrapper>
      <Header />
      <SubHeader />
      <RegisterFormContainer />
    </AppWrapper>
  </>
)

export default Register
