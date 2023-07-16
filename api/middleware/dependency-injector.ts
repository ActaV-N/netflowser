import { Middleware } from '@koa/router';
import { Context } from '@ecubelabs/seed';

export const dependencyInjector: Middleware = async (ctx, next) => {
  const { txId } = ctx.state;
  let context;

  try {
    context = Context.of(txId);
    ctx.state.context = context;

    await next();
  } finally {
    if (context) {
      context.dispose();
    }
  }
};
