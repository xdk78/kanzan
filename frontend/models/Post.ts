import User from './User'

export default interface Post {
  _id: string
  title: string
  author: User
  tags: any[]
  content: string
  createdAt: string
  updatedAt: string
}
