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

    const post = await postModel
      .findById(ctx.query._id)
      .populate([{ path: 'author', model: userModel, select: '_id username' }])
    await existingConnection.disconnect()

    if (post) {
      ctx.status = 200
      ctx.body = { data: post }
    } else {
      ctx.throw(404, `Could not find post: ${ctx.query._id}`)
      await existingConnection.disconnect()
    }

    await existingConnection.disconnect()
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
