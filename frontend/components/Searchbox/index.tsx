import styled from '../../utils/styled-components'

export default styled.input`
  display: flex;
  flex: 1;
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  background: ${props => props.theme.cardColor};
  padding: 8px;
  border-radius: 16px;
  color: ${props => props.theme.textColor};
  transition: all 0.25s ease-in-out;
  caret-color: ${props => props.theme.accentColor};
`
