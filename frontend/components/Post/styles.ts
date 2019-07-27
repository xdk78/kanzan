import styled from '../../utils/styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  margin: 0px 0px 8px 0px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  &:hover {
    transition: all 0.25s ease-in-out;
    background: ${({ theme }) => theme.cardColor};
  }
`

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 8px 8px 8px;
  font-size: 24px;
  font-family: 'Francois One', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Body = styled.div`
  padding: 0px 8px 8px 8px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
`

export { TopWrapper, Wrapper, Body, Title }
