import styled from '../../utils/styled-components'
import { LinkButton as SubLinkButton } from '../SubHeader/styles'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  background: ${props => props.theme.backgroundColor};
  align-items: center;
  justify-content: center;
  padding: 0px 8px 0px 8px;
`

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: ${props => props.theme.backgroundColor};
  align-items: center;
  justify-content: center;
`

export const Title = styled.div`
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

export const LinkButton = styled.a`
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

export const Username = styled(LinkButton)``

export const DropdownButton = styled(SubLinkButton)`
  font-size: 18px;
`

export const IconButton = styled(LinkButton)`
  font-size: 24px;
`
