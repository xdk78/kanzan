import App, { Container, DefaultAppIProps, NextAppContext } from 'next/app'
import * as React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import withReduxStore from 'next-redux-wrapper'
import { Store } from 'redux'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import nookies from 'nookies'
import { NextContext } from 'next'
import { setToken } from '../actions/authActions'
import darkTheme from '../themes/dark'
import { style } from '../themes/styles'
import makeStore from '../store'
import { createGlobalStyle, ThemeProvider } from '../utils/styled-components'

dayjs.extend(relativeTime)

const GlobalStyle = createGlobalStyle`${style}`

interface KanzanAppProps extends DefaultAppIProps {
  store: Store
  token: string
}

interface Context extends NextContext {
  store: Store
}

export interface AppContext extends NextAppContext {
  ctx: Context
}

class MyApp extends App<KanzanAppProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const { token } = nookies.get(ctx)

    let loggedIn = false

    if (token) {
      // Set the token on the server side
      ctx.store.dispatch(setToken(token) as any)
      loggedIn = true
      if (ctx.pathname === '/login' || ctx.pathname === '/register') {
        ctx.res.writeHead(301, { Location: '/' })
        ctx.res.end()
      }
    }

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return { pageProps, token, loggedIn }
  }

  componentDidMount() {
    const { token, store } = this.props
    if (token) {
      // Set token on the client side too
      store.dispatch(setToken(token) as any)
    }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <ThemeProvider theme={darkTheme}>
            <>
              <GlobalStyle />
              <Head>
                <title>Kanzan</title>
              </Head>
              <Component {...pageProps} />
            </>
          </ThemeProvider>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(makeStore)(MyApp)
