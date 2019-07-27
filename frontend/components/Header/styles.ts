import styled from '../../utils/styled-components'
import { LinkButton as SubLinkButton } from '../SubHeader/styles'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  background: ${props => props.theme.backgroundColor};
  align-items: center;
  justify-content: center;
  padding: 0px 8px 0px 8px;
`

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: ${props => props.theme.backgroundColor};
  align-items: center;
  justify-content: center;
`

const Title = styled.div`
  font-size: 24px;
  padding: 4px;
  font-weight: 900;
  color: ${props => props.theme.textColor};
  user-select: none;
  cursor: pointer;
  font-family: 'Francois One', sans-serif;

  ::first-letter {
    font-family: 'Major Mono Display', monospace;
    font-size: 26px;
  }
  :hover {
    color: ${props => props.theme.accentColor};
    transition: all 0.25s ease-in-out;
  }
`

const LinkButton = styled.a`
  display: flex;
  border: none;
  font-size: 18px;
  padding: 8px;
  color: ${props => props.theme.textColor};
  background: ${props => props.theme.backgroundColor};
  text-decoration: none;
  cursor: pointer;

  :active,
  :visited {
    color: ${props => props.theme.textColor};
  }
  :hover {
    color: ${props => props.theme.accentColor};
    transition: all 0.25s ease-in-out;
    text-decoration: none;
  }
`

const Username = styled(LinkButton)`
  @media (max-width: 768px) {
    display: none;
  }
`

const DropdownButton = styled(SubLinkButton)`
  font-size: 18px;
`

const IconButton = styled(LinkButton)`
  font-size: 24px;
`

export { Wrapper, AvatarWrapper, Username, Title, LinkButton, DropdownButton, IconButton }
