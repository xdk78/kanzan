import React from 'react'
import Document, { Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

type Props = {
  styleTags: React.ReactElement<{}>[]
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <link rel="icon" type="image/x-icon" href="static/favicon.ico" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, maximum-scale=5.0, minimal-ui"
            key="viewport"
          />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Kanzan - share something" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link
            href="https://fonts.googleapis.com/css?family=Francois+One|Major+Mono+Display|Roboto&display=swap"
            rel="stylesheet"
          />

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
