import styled from '../../utils/styled-components'

interface AvatarProps {
  readonly url?: string
}

export default styled.div<AvatarProps>`
  padding: 0px;
  cursor: pointer;
  background-image: url(${props => props.url});
  width: 36px;
  height: 36px;
  background-size: cover;
  background-position: top center;
  border-radius: 50%;
`
