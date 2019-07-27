import Koa from 'koa'
import { createApp, KContext } from '../../..'
import { dbConfing } from '../../../utils/db'
import mongoose from 'mongoose'
import User from '../../../models/User'
import Post from '../../../models/post/Post'

async function main(ctx: KContext) {
  try {
    const existingConnection = await mongoose.connect(process.env.MONGODB_URI, dbConfing)

    const userModel = new User().getModelForClass(User, { existingMongoose: existingConnection })
    const postModel = new Post().getModelForClass(Post, { existingMongoose: existingConnection })

    const user = await userModel
      .findOne({ username: ctx.query.username })
      .populate([{ path: 'posts', model: postModel }])
    await existingConnection.disconnect()

    if (user) {
      ctx.status = 200
      ctx.body = {
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          posts: user.posts
        }
      }
    } else {
      ctx.throw(404, `Could not find user: ${ctx.query.username}`)
      await existingConnection.disconnect()
    }
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
