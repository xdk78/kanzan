import styled, { css } from '../../utils/styled-components'

type DropdownMenuProps = {
  hidden?: boolean
}

export const Dropdown = styled.div`
  position: relative;
  color: ${({ theme }) => theme.textColor};
  user-select: none;
  z-index: 9999;
`

export const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  left: -75%;
  padding: 0 0;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.backgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 0px rgba(0, 0, 0, 0.24);
  ${props =>
    props.hidden
      ? css`
          display: none;
        `
      : css`
          display: flex;
          flex-direction: column;
        `};
`
export const DropdownIconButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  color: ${({ theme }) => theme.secondaryTextColor};
  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`
