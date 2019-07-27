import { Context } from 'koa'
import User from '../models/User'
import { extractToken, decodeToken, verifyToken } from '../utils/authUtils'
import { dbConfing } from '../utils/db'
import mongoose from 'mongoose'

export default async function(ctx: Context, next: () => Promise<any>) {
  try {
    const existingConnection = await mongoose.connect(process.env.MONGODB_URI, dbConfing)

    const userModel = new User().getModelForClass(User, { existingMongoose: existingConnection })

    const token = extractToken(ctx.req)
    const payload = decodeToken(token) as any
    const user = await userModel.findById(payload.payload.id)
    await existingConnection.disconnect()

    const secret = `${user.secret}@${String(process.env.API_JWT_SECRET_TOKEN)}`
    const vaildToken = await verifyToken(token, secret)

    ctx.state.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    }

    ctx.state.token = vaildToken

    await next()
  } catch (error) {
    ctx.res.setHeader('content-type', 'application/json')
    ctx.res.statusCode = 401
    ctx.res.end(
      JSON.stringify({
        error: 'Unauthorized 401'
      })
    )
  }
}
