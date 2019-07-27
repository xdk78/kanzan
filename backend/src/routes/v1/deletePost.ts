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
    const { _id } = ctx.query

    await userModel.findOneAndUpdate({ _id: ctx.state.user._id }, { $pull: { posts: _id } })
    await postModel.findByIdAndDelete({ _id })
    await existingConnection.disconnect()

    ctx.status = 200
    ctx.body = {
      message: 'Success',
      data: {}
    }
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(jwtMiddleware)
  app.use(main)
})
