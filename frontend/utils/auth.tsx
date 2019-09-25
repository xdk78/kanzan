import React from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export const login = async ({ token }) => {
  cookie.set('token', token, { expires: 30 })
  Router.push('/')
}

export const logout = () => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now().toString())
  Router.push('/login')
}

export const auth = (ctx: { req?: NextApiRequest; res?: NextApiResponse }) => {
  const { token } = nextCookie(ctx)
  let loggedIn = false
  if (token) {
    loggedIn = true
  }

  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req && !token) {
    loggedIn = false
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    loggedIn = false
    Router.push('/login')
  }

  return { token, loggedIn }
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || 'Component'

export const WithAuthSync = WrappedComponent => {
  return class extends React.PureComponent {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps(ctx) {
      const { token, loggedIn } = auth(ctx)

      const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))
      return { ...componentProps, token, loggedIn }
    }

    constructor(props) {
      super(props)
      this.syncLogout = this.syncLogout.bind(this)
    }

    componentDidMount() {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout(event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
