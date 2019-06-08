import Koa from 'koa'
import { createApp, KContext } from '../..'

async function main(ctx: KContext, next: Function) {
  ctx.status = 200
  ctx.body = {
    message: `Api say Hello`
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
