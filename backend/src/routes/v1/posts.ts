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

    const perPage = 9
    const page = Number(ctx.query.page) || 1

    const posts = await postModel
      .find()
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ createdAt: 'desc' })
      .populate([{ path: 'author', model: userModel, select: '_id username' }])

    const count = await postModel.estimatedDocumentCount({})
    const pages = Math.ceil(count / perPage)

    ctx.status = 200
    ctx.body = {
      page,
      pages,
      data: posts
    }

    await existingConnection.disconnect()
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
