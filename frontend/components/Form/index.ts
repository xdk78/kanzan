import styled from '../../utils/styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 24em;
  justify-content: center;
`

const FormCard = styled.form`
  display: flex;
  flex: 0.3;
  padding: 16px;
  font-size: 16px;
  background: ${props => props.theme.cardColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  flex-direction: column;
`

const FormButton = styled.input`
  display: flex;
  justify-content: space-around;
  padding: 8px;
  margin: 8px 0px 0px 0px;
  color: ${props => props.theme.textColor};
  background: ${props => props.theme.cardColor};
  border: none;
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 12px;
  outline: none;
  :focus {
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.accentColor};
  }
  &:active,
  &:visited {
    color: ${props => props.theme.textColor};
  }
  &:hover {
    color: ${props => props.theme.textColor};
    background: ${props => props.theme.accentHoverColor};
    transition: all 0.25s ease-in-out;
    text-decoration: none;
  }
`

const Input = styled.input`
  outline: none;
  background: ${props => props.theme.cardColor};
  padding: 8px;
  margin: 8px 0px 0px 0px;
  height: 24px;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${props => props.theme.textColor};
  transition: all 0.25s ease-in-out;
  caret-color: ${props => props.theme.accentColor};

  :focus {
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.borderColor};
  }
`

export { Wrapper, FormCard, Input, FormButton }
