import styled from '../../utils/styled-components'

export const AuthorBarWrapper = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: row;
`

export const NicknameWrapper = styled.div`
  font-size: 14px;
`

export const NicknameDateWrapper = styled.div`
  padding: 0px;
  justify-content: center;
  display: flex;
  margin: 0px 0px 0px 12px;
  flex-direction: column;
`

export const DateWrapper = styled.div`
  color: ${props => props.theme.secondaryTextColor};
  font-size: 12px;
`
