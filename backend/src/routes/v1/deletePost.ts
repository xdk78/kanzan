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
    const { _id } = ctx.query

    await userModel.findOneAndUpdate({ _id: ctx.state.user._id }, { $pull: { posts: _id } })
    await postModel.findByIdAndDelete({ _id })

    ctx.status = 200
    ctx.body = {
      message: 'Success',
      data: {}
    }
    existingConnection.close()
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(jwtMiddleware)
  app.use(main)
})
