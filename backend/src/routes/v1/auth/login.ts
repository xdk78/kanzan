import Koa from 'koa'
import { createApp, KContext } from '../../..'
import { dbConfing } from '../../../utils/db'
import mongoose from 'mongoose'
import User from '../../../models/User'
import Post from '../../../models/post/Post'
import { compare } from 'bcrypt'
import { generateToken } from '../../../utils/authUtils'

async function main(ctx: KContext) {
  try {
    const existingConnection = await mongoose.connect(process.env.MONGODB_URI, dbConfing)

    const userModel = new User().getModelForClass(User, { existingMongoose: existingConnection })
    const postModel = new Post().getModelForClass(Post, { existingMongoose: existingConnection })
    const { email, password } = ctx.request.body

    const userFromDb = await userModel
      .findOne({ email })
      .populate([{ path: 'posts', model: postModel }])
    await existingConnection.disconnect()

    if (userFromDb) {
      if (await compare(password, userFromDb.password)) {
        const tokenPayload = { _id: userFromDb._id, username: userFromDb.username }

        const token = generateToken(userFromDb.secret, tokenPayload)

        ctx.status = 200
        ctx.body = {
          data: {
            token
          }
        }
      } else {
        ctx.throw(403, 'Wrong password')
        await existingConnection.disconnect()
      }
    } else {
      ctx.throw(404, 'Could not find user')
      await existingConnection.disconnect()
    }
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
