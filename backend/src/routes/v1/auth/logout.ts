import Koa from 'koa'
import { createApp, KContext } from '../../..'
import connection from '../../../utils/db'
import User from '../../../models/User'
import { getRandomString } from '../../../utils/authUtils'
import jwtMiddleware from '../../../middlewares/jwt'

async function main(ctx: KContext) {
  try {
    const existingConnection = await connection()
    const userModel = new User().getModelForClass(User, { existingConnection })
    await userModel.destroySessions(ctx.state.user._id, getRandomString(32))
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
