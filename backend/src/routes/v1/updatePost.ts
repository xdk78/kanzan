import Koa from 'koa'
import { createApp, KContext } from '../..'
import { dbConfing } from '../../utils/db'
import mongoose from 'mongoose'
import Post from '../../models/post/Post'
import jwtMiddleware from '../../middlewares/jwt'
import User from '../../models/User'

async function main(ctx: KContext) {
  try {
    const existingConnection = await mongoose.connect(process.env.MONGODB_URI, dbConfing)

    const postModel = new Post().getModelForClass(Post, { existingMongoose: existingConnection })
    const userModel = new User().getModelForClass(User, { existingMongoose: existingConnection })

    const { _id } = ctx.query
    const { title, content, tags } = ctx.request.body as Post

    const updatedPost = await postModel
      .findOneAndUpdate(
        { _id, author: ctx.state.user._id },
        {
          title,
          content,
          tags,
          updatedAt: new Date().toISOString()
        },
        { new: true }
      )
      .populate([{ path: 'author', model: userModel, select: '_id username' }])
    await existingConnection.disconnect()

    ctx.status = 200
    ctx.body = {
      message: 'Success',
      data: updatedPost
    }
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(jwtMiddleware)
  app.use(main)
})
