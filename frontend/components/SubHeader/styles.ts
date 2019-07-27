import styled, { css } from '../../utils/styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 36px;
  padding: 0px 4px 0px 4px;
  background: ${props => props.theme.backgroundColor};
  align-items: center;
  border-bottom: 1px solid
    ${(
      props // tslint:disable-next-line:prefer-template
    ) => props.theme.borderColor + '3d'};
`

const LinkButton = styled.a`
  display: flex;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px;
  color: ${props => props.theme.textColor};
  background: ${props => props.theme.backgroundColor};
  text-decoration: none;
  cursor: pointer;
  &:active,
  &:visited {
    color: ${props => props.theme.textColor};
  }
  &:hover {
    color: ${props => props.theme.accentColor};
    background: ${props => props.theme.accentHoverColor};
    transition: all 0.25s ease-in-out;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const IconButton = styled.div`
  font-size: 24px;
  padding: 0px 0px 0px 4px;
`

const IconLinkButton = styled.div`
  display: flex;
  font-size: 16px;
  padding: 4px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const IconButtonWrapper = styled.a<{ color?: string }>`
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  color: ${props => props.theme.textColor};
  background: ${props => props.theme.backgroundColor};
  padding: 4px;
  cursor: pointer;
  color: ${props => props.theme.textColor};
  &:active,
  &:visited {
    color: ${props => props.theme.textColor};
  }
  &:hover {
    color: ${props => props.color || props.theme.accentColor};
    background: ${props =>
      // tslint:disable-next-line:prefer-template
      props.color + '3d' || props.theme.accentHoverColor};
    transition: all 0.25s ease-in-out;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export { Wrapper, LinkButton, IconButton, IconButtonWrapper, IconLinkButton }
