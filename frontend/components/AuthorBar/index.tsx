import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { DateWrapper, NicknameWrapper, NicknameDateWrapper, AuthorBarWrapper } from './styles'
import Avatar from '../Avatar'
import User from '../../models/User'

type AuthorBarProps = {
  author: User
  createdAt: string
}

const AuthorBar = ({ author }: AuthorBarProps) => {
  const avatarUrl = useMemo(
    () => `https://ui-avatars.com/api/?background=0095ff&color=fff&rounded=true&size=36&name=${author.username}`,
    [author]
  )

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

export default AuthorBar
