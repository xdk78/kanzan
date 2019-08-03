import styled from '../../utils/styled-components'
import { DropdownMenu } from '../Dropdown'

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
  padding: 0px 8px 8px 8px;
  font-size: 24px;
  font-family: 'Francois One', sans-serif;
  min-width: 0;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  overflow: hidden;
`

const Body = styled.div`
  padding: 0px 8px 8px 8px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  word-break: break-all;
  overflow: hidden;
`

const PostDropdownMenu = styled(DropdownMenu)`
  left: -185%;
`

export { TopWrapper, Wrapper, Body, Title, PostDropdownMenu }
