import styled, { keyframes } from '../../utils/styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid ${props => props.theme.accentColor};
  border-right: 2px solid ${props => props.theme.accentColor};
  border-bottom: 2px solid ${props => props.theme.accentColor};
  border-left: 2px solid ${props => props.theme.accentHoverColor};
  background: transparent;
  width: 36px;
  height: 36px;
  border-radius: 50%;
`

export default Spinner
