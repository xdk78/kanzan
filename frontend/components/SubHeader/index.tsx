import React from 'react'
import { Wrapper } from './styles'
import Searchbox from '../Searchbox'
import { Spacer, IconButtonWrapper, IconButton, IconLinkButton } from '../shared'

const SubHeader = () => (
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

export default SubHeader
