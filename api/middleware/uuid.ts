import { Middleware } from '@koa/router';
import { v4 as uuidV4 } from 'uuid';

export const uuidMiddleware: Middleware = async (ctx, next) => {
  ctx.state.txId = ctx.get('x-request-id') ?? uuidV4();
  await next();
};
