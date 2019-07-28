import styled from '../../utils/styled-components'

const AuthorBarWrapper = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: row;
`

const NicknameWrapper = styled.div`
  font-size: 14px;
`

const NicknameDateWrapper = styled.div`
  padding: 0px;
  justify-content: center;
  display: flex;
  margin: 0px 0px 0px 12px;
  flex-direction: column;
`

const DateWrapper = styled.div`
  color: ${props => props.theme.secondaryTextColor};
  font-size: 12px;
`

export { AuthorBarWrapper, NicknameDateWrapper, NicknameWrapper, DateWrapper }
