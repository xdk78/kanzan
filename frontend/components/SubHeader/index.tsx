import { Wrapper, IconButtonWrapper, IconButton, IconLinkButton } from './styles'
import * as React from 'react'
import Searchbox from './../Searchbox'
import { Spacer } from '../shared'

interface ISubHeaderProps {
  readonly loggedIn: boolean
}

export default class SubHeader extends React.PureComponent<ISubHeaderProps, {}> {
  render() {
    return (
      <Wrapper role="navigation" aria-label="Sub navigation">
        <IconButtonWrapper color="#00936b" role="menuitem">
          <IconButton className="material-icons">trending_up</IconButton>
          <IconLinkButton>Top</IconLinkButton>
        </IconButtonWrapper>
        <IconButtonWrapper color="#D50000" role="menuitem">
          <IconButton className="material-icons">whatshot</IconButton>
          <IconLinkButton>Hot</IconLinkButton>
        </IconButtonWrapper>
        <Spacer />
        <Searchbox placeholder="Search..." />
      </Wrapper>
    )
  }
}
