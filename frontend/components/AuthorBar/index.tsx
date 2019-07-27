import * as React from 'react'
import { MoreButton, DateWrapper, NicknameWrapper, NicknameDateWrapper, AuthorBarWrapper } from './styles'
import Avatar from '../Avatar'
import { User } from '../../models'
import dayjs from 'dayjs'
import { Spacer } from '../shared'

interface IAuthorBarProps {
  readonly author: User
  readonly createdAt: string
}

export default class AuthorBar extends React.PureComponent<IAuthorBarProps> {
  render() {
    const author = this.props.author
    return (
      <AuthorBarWrapper>
        <Avatar
          // tslint:disable-next-line: max-line-length
          url={`https://ui-avatars.com/api/?background=0095ff&color=fff&rounded=true&size=36&name=${author.username}`}
        />
        <NicknameDateWrapper>
          <NicknameWrapper>{author.username}</NicknameWrapper>
          <DateWrapper>{dayjs(this.props.createdAt).fromNow()}</DateWrapper>
        </NicknameDateWrapper>
        <Spacer />
        <MoreButton className="material-icons">more_vert</MoreButton>
      </AuthorBarWrapper>
    )
  }
}
