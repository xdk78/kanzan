import Koa from 'koa'
import { createApp, KContext } from '../..'
import connection from '../../utils/db'
import Post from '../../models/post/Post'
import User from '../../models/User'
import jwtMiddleware from '../../middlewares/jwt'

async function main(ctx: KContext) {
  try {
    const existingConnection = await connection()
    const postModel = new Post().getModelForClass(Post, { existingConnection })

    const userModel = new User().getModelForClass(User, { existingConnection })

    const { title, description, tags } = ctx.request.body as Post

    const isoDate = new Date().toISOString()

    const newPost = new postModel({
      title,
      description,
      tags,
      author: ctx.state.user._id,
      createdAt: isoDate,
      updatedAt: isoDate
    })

    await newPost.save()

    await userModel.findOneAndUpdate({ _id: ctx.state.user._id }, { $push: { posts: newPost } })

    ctx.status = 201
    ctx.body = { data: newPost }
    existingConnection.close()
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(jwtMiddleware)
  app.use(main)
})
