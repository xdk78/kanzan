import Koa from 'koa'
import { createApp, KContext } from '../../..'
import connection from '../../../utils/db'
import User from '../../../models/User'
import Post from '../../../models/post/Post'
import { compare } from 'bcrypt'
import { generateToken } from '../../../utils/authUtils'

async function main(ctx: KContext) {
  try {
    const existingConnection = await connection()
    const userModel = new User().getModelForClass(User, { existingConnection })
    const postModel = new Post().getModelForClass(Post, { existingConnection })
    const { username, password } = ctx.request.body

    const userFromDb = await userModel
      .findOne({ username })
      .populate([{ path: 'posts', model: postModel }])
    if (userFromDb) {
      if (await compare(password, userFromDb.password)) {
        const token = generateToken(userFromDb.secret, userFromDb.id)
        ctx.status = 200
        ctx.body = {
          data: {
            _id: userFromDb._id,
            username: userFromDb.username,
            email: userFromDb.email,
            createdAt: userFromDb.createdAt,
            posts: userFromDb.posts,
            token
          }
        }

        existingConnection.close()
      } else {
        ctx.throw(403, 'Wrong password')
        existingConnection.close()
      }
    } else {
      ctx.throw(404, 'Could not find user')
      existingConnection.close()
    }
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
