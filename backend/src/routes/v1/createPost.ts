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

    const newPost = new postModel({
      title: ctx.request.body.title,
      description: ctx.request.body.description,
      tags: ctx.request.body.tags,
      author: ctx.state.user._id,
      createdAt: new Date().toISOString()
    })

    await newPost.save()

    await userModel.findOneAndUpdate({ _id: ctx.state.user._id }, { $push: { posts: newPost } })

    ctx.status = 200
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
