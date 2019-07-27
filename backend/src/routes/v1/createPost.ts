import Koa from 'koa'
import { createApp, KContext } from '../..'
import { dbConfing } from '../../utils/db'
import mongoose from 'mongoose'
import Post from '../../models/post/Post'
import User from '../../models/User'
import jwtMiddleware from '../../middlewares/jwt'

async function main(ctx: KContext) {
  try {
    const existingConnection = await mongoose.connect(process.env.MONGODB_URI, dbConfing)

    const postModel = new Post().getModelForClass(Post, { existingMongoose: existingConnection })

    const userModel = new User().getModelForClass(User, { existingMongoose: existingConnection })

    const { title, content, tags } = ctx.request.body as Post

    const isoDate = new Date().toISOString()

    const newPost = new postModel({
      title,
      content,
      tags,
      author: ctx.state.user._id,
      createdAt: isoDate,
      updatedAt: isoDate
    })

    await newPost.save()

    await userModel.findOneAndUpdate({ _id: ctx.state.user._id }, { $push: { posts: newPost } })
    await existingConnection.disconnect()

    ctx.status = 201
    ctx.body = { data: newPost }
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(jwtMiddleware)
  app.use(main)
})
