import Koa from 'koa'
import { createApp, KContext } from '../..'
import { dbConfing } from '../../utils/db'
import mongoose from 'mongoose'
import Post from '../../models/post/Post'
import User from '../../models/User'

async function main(ctx: KContext) {
  try {
    const existingConnection = await mongoose.connect(process.env.MONGODB_URI, dbConfing)

    const postModel = new Post().getModelForClass(Post, { existingMongoose: existingConnection })
    const userModel = new User().getModelForClass(User, { existingMongoose: existingConnection })

    const posts = await postModel
      .find()
      .sort({ createdAt: 'desc' })
      .populate([{ path: 'author', model: userModel }])

    ctx.status = 200
    ctx.body = { data: posts }

    await existingConnection.disconnect()
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
