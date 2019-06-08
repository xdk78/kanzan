import Koa from 'koa'
import { createApp, KContext } from '../../..'
import connection from '../../../utils/db'
import User from '../../../models/User'
import Post from '../../../models/post/Post'

async function main(ctx: KContext) {
  try {
    const existingConnection = await connection()

    const userModel = new User().getModelForClass(User, { existingConnection })
    const postModel = new Post().getModelForClass(Post, { existingConnection: await connection() })

    const user = await userModel
      .findOne({ username: ctx.query.username })
      .populate([{ path: 'posts', model: postModel }])

    if (user) {
      ctx.status = 200
      ctx.body = {
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          posts: user.posts
        }
      }

      existingConnection.close()
    } else {
      ctx.throw(404, `Could not find user: ${ctx.query.username}`)
      existingConnection.close()
    }
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
