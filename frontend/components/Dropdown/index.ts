import styled, { css } from '../../utils/styled-components'

interface IDropdownMenu {
  readonly hidden?: boolean
}

const Dropdown = styled.div`
  position: relative;
  color: ${({ theme }) => theme.textColor};
  user-select: none;
  z-index: 9999;
`

const DropdownMenu = styled.div<IDropdownMenu>`
  position: absolute;
  left: -150%;
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

export { Dropdown, DropdownMenu }
