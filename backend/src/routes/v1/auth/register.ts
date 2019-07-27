import Koa from 'koa'
import { createApp, KContext } from '../../..'
import { dbConfing } from '../../../utils/db'
import mongoose from 'mongoose'
import User from '../../../models/User'
import { hash } from 'bcrypt'
import { getRandomString, saltRounds } from '../../../utils/authUtils'

async function main(ctx: KContext) {
  try {
    const existingConnection = await mongoose.connect(process.env.MONGODB_URI, dbConfing)
    const userModel = new User().getModelForClass(User, { existingMongoose: existingConnection })
    if (
      await userModel.findOne({
        username: ctx.request.body.username,
        email: ctx.request.body.email
      })
    ) {
      ctx.throw(403, 'User does exit')
    } else {
      const userSecret = getRandomString(32)
      const isoDate = new Date().toISOString()

      const user = new userModel({
        username: ctx.request.body.username,
        email: ctx.request.body.email,
        password: await hash(ctx.request.body.password, saltRounds),
        createdAt: isoDate,
        updatedAt: isoDate,
        secret: userSecret
      })

      if (user) {
        await user.save()
        await existingConnection.disconnect()

        ctx.status = 201
        ctx.body = {
          data: {}
        }
      } else {
        ctx.throw(403, 'Wrong credentials')
        await existingConnection.disconnect()
      }
    }
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
