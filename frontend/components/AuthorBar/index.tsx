import React from 'react'
import dayjs from 'dayjs'
import { DateWrapper, NicknameWrapper, NicknameDateWrapper, AuthorBarWrapper } from './styles'
import Avatar from '../Avatar'
import User from '../../models/User'

interface AuthorBarProps {
  readonly author: User
  readonly createdAt: string
}

export default class AuthorBar extends React.PureComponent<AuthorBarProps> {
  render() {
    const { author } = this.props
    // eslint-disable-next-line max-len
    const avatarUrl = `https://ui-avatars.com/api/?background=0095ff&color=fff&rounded=true&size=36&name=${author.username}`
    return (
      <AuthorBarWrapper>
        <Avatar url={avatarUrl} />
        <NicknameDateWrapper>
          <NicknameWrapper>{author.username}</NicknameWrapper>
          <DateWrapper>{dayjs(this.props.createdAt).fromNow()}</DateWrapper>
        </NicknameDateWrapper>
      </AuthorBarWrapper>
    )
  }
}
