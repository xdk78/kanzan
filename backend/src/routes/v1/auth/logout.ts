import Koa from 'koa'
import { createApp, KContext } from '../../..'
import { dbConfing } from '../../../utils/db'
import mongoose from 'mongoose'
import User from '../../../models/User'
import { getRandomString } from '../../../utils/authUtils'
import jwtMiddleware from '../../../middlewares/jwt'

async function main(ctx: KContext) {
  try {
    const existingConnection = await mongoose.connect(process.env.MONGODB_URI, dbConfing)
    const userModel = new User().getModelForClass(User, { existingMongoose: existingConnection })
    await userModel.destroySessions(ctx.state.user._id, getRandomString(32))
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
