import Koa from 'koa'
import { createApp, KContext } from '../..'
import connection from '../../utils/db'
import Post from '../../models/post/Post'
import jwtMiddleware from '../../middlewares/jwt'

async function main(ctx: KContext) {
  try {
    const existingConnection = await connection()
    const postModel = new Post().getModelForClass(Post, { existingConnection })

    const { _id } = ctx.query
    const { title, description, tags } = ctx.request.body as Post

    const updatedPost = await postModel.findOneAndUpdate(
      { _id, author: ctx.state.user._id },
      {
        title,
        description,
        tags,
        updatedAt: new Date().toISOString()
      },
      { new: true }
    )

    ctx.status = 200
    ctx.body = {
      message: 'Success',
      data: updatedPost
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
