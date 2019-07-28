import styled from '../../utils/styled-components'

const IconButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  user-select: none;
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
export { IconButton, IconButtonWrapper, IconLinkButton }
