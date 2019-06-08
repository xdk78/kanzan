import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import User from './models/User'
import { Ref } from 'typegoose'

export interface KContext extends Koa.Context {
  state: {
    token: string
    user: {
      _id: string & Ref<User>
      username: string
      email: string
      createdAt: string
    }
  }
}

export function createApp(main: (app: Koa) => any) {
  const app = new Koa()

  app.use(logger())
  app.use(helmet())
  app.use(bodyParser())
  app.use(async (ctx: Koa.Context, next: Function) => {
    ctx.res.statusCode = 200
    try {
      await next()
    } catch (err) {
      console.error(err)
      ctx.status = err.status || 500
      ctx.body = { error: err.message }
      ctx.app.emit('error', err, ctx)
    }
  })

  main(app)

  return app.callback()
}
