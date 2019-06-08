import Koa from 'koa'
import { createApp, KContext } from '../..'
import connection from '../../utils/db'
import Post from '../../models/post/Post'

async function main(ctx: KContext) {
  try {
    const existingConnection = await connection()

    const postModel = new Post().getModelForClass(Post, { existingConnection: await connection() })
    const posts = await postModel.find()

    ctx.status = 200
    ctx.body = { data: posts }
    existingConnection.close()
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
