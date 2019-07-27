import styled, { css } from '../utils/styled-components'

const style = css`
  * *:before *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-family: 'Roboto', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  a,
  a:active,
  a:visited {
    color: #0095ff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`

const AppWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const FeedWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 8px;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7;
  padding: 8px;
  width: 100%;
`

export { AppWrapper, style, FeedWrapper, PostsWrapper }
