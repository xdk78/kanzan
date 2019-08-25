import ContentEditable from 'react-contenteditable'
import styled from '../../utils/styled-components'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 8px;
  resize: vertical;
  flex-direction: column;
  align-items: left;
  border: 1px solid ${props => props.theme.borderColor};
  background: ${props => props.theme.cardColor};
  margin: 0px 0px 8px 0px;
  border-radius: 8px;
`

const Actions = styled.div`
  color: ${props => props.theme.secondaryTextColor};
  display: flex;
  flex: 1;
  flex-direction: row;
  font-size: 14px;
  align-items: center;
  justify-content: center;
`

const Submit = styled.button`
  background: ${props => props.theme.cardColor};
  padding: 8px;
  font-size: 18px;
  border-width: 1px;
  border: none;
  color: ${props => props.theme.secondaryTextColor};
  cursor: pointer;
  user-select: none;
  &:hover {
    color: ${props => props.theme.accentColor};
    transition: all 0.25s ease-in-out;
  }
  &::before,
  &::after {
    content: '';
    flex: 1 0 auto;
  }
  &:focus {
    outline: none;
  }
`

const Input = styled(ContentEditable)`
  display: flex;
  flex: 1;
  padding: 8px;
  overflow: hidden;
  outline: none;
  border: none;
  background: ${props => props.theme.cardColor};
  padding: 8px;
  font-size: 16px;
  border-radius: 16px;
  color: ${props => props.theme.textColor};
  transition: all 0.25s ease-in-out;
  caret-color: ${props => props.theme.accentColor};
  resize: none;
  font-family: inherit;
  user-modify: read-write-plaintext-only;
  cursor: text;
  &:empty::before {
    content: attr(placeholder);
    color: ${props => props.theme.secondaryTextColor};
  }
`

export { Wrapper, Input, Submit, Actions }
