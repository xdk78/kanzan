import { Context } from 'koa'
import User from '../models/User'
import { extractToken, decodeToken, verifyToken } from '../utils/authUtils'
import connection from '../utils/db'

export default async function(ctx: Context, next: () => Promise<any>) {
  const userModel = new User().getModelForClass(User, { existingConnection: await connection() })
  try {
    const token = extractToken(ctx.req)
    const payload = decodeToken(token) as any
    const user = await userModel.findById(payload.payload.id)
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
