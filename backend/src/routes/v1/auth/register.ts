import Koa from 'koa'
import { createApp, KContext } from '../../..'
import connection from '../../../utils/db'
import User from '../../../models/User'
import { hash } from 'bcrypt'
import { getRandomString, saltRounds } from '../../../utils/authUtils'

async function main(ctx: KContext) {
  try {
    const existingConnection = await connection()
    const userModel = new User().getModelForClass(User, { existingConnection })
    if (
      await userModel.findOne({
        username: ctx.request.body.username,
        email: ctx.request.body.email
      })
    ) {
      ctx.throw(403, 'User does exit')
    } else {
      const userSecret = getRandomString(32)

      const user = new userModel({
        username: ctx.request.body.username,
        email: ctx.request.body.email,
        password: await hash(ctx.request.body.password, saltRounds),
        createdAt: new Date().toISOString(),
        secret: userSecret
      })

      if (user) {
        await user.save()

        ctx.status = 200
        ctx.body = {
          data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            posts: user.posts
          }
        }

        existingConnection.close()
      } else {
        ctx.throw(403, 'Wrong credentials')
        existingConnection.close()
      }
    }
  } catch (error) {
    throw error
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
