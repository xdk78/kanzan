import Koa from 'koa'
import { createApp, KContext } from '../..'
import connection from '../../utils/db'
import Post from '../../models/post/Post'

async function main(ctx: KContext) {
  try {
    const existingConnection = await connection()
    const postModel = new Post().getModelForClass(Post, { existingConnection: await connection() })
    const post = await postModel.findById(ctx.query._id)
    if (post) {
      ctx.status = 200
      ctx.body = { data: post }

      existingConnection.close()
    } else {
      ctx.throw(404, `Could not find post: ${ctx.query._id}`)
      existingConnection.close()
    }

    existingConnection.close()
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
