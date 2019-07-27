import * as React from 'react'
import marksy from 'marksy'
import emoji from 'node-emoji'
import { MarkedOptions } from 'marked'
import { isURLSafe } from './'

export default (markdown: string): JSX.Element => {
  const replacer = (match: string) => emoji.emojify(match)
  // tslint:disable-next-line:no-parameter-reassignment
  markdown = markdown.replace(/(:.*:)/g, replacer)

  const compile = marksy({
    createElement: React.createElement,
    elements: {
      h1({ children }) {
        return children
      },
      h2({ children }) {
        return children
      },
      h3({ children }) {
        return children
      },
      h4({ children }) {
        return children
      },
      h5({ children }) {
        return children
      },
      h6({ children }) {
        return children
      },
      // tslint:disable-next-line:function-name
      a({ href, children }) {
        if (isURLSafe(href) && isURLSafe(children)) {
          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children || href}
            </a>
          )
        }
        return children
      },
      code({ code }) {
        return (
          <code>
            <pre
              style={{
                whiteSpace: 'pre-wrap'
              }}
            >
              {code}
            </pre>
          </code>
        )
      },
      img({ children, src }) {
        if (isURLSafe(src) && isURLSafe(children)) {
          return (
            <a href={src} target="_blank" rel="noopener noreferrer">
              {children || src}
            </a>
          )
        }
        return children
      },
      // tslint:disable-next-line:function-name
      p({ children }) {
        return children
      }
    }
  })

  const compiled = compile(markdown, {
    sanitize: true,
    gfm: true,
    tables: false,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: false
  } as MarkedOptions)

  return compiled.tree as JSX.Element
}
