import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import gracefulShutdown from 'http-graceful-shutdown';
import { dependencyInjector, uuidMiddleware } from '~api/middleware';
import { initDataSource } from '~api/lib/datasource';

const port = process.env.PORT;

(async () => {
  const dataSource = await initDataSource();

  const app = new Koa();
  const router = new Router();

  router.get('/ping', async (ctx) => {
    ctx.body = { data: 'pong' };
  });

  app.use(cors());
  app.use(uuidMiddleware);
  app.use(dependencyInjector);

  app.use(router.middleware());

  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });

  gracefulShutdown(app, {
    signals: 'SIGINT SIGTERM',
    timeout: 30000,
    onShutdown: async () => {
      console.log('The server shuts down when the connection is cleaned up.');
      await Promise.all([dataSource.destroy()]);
    },
    finally: () => {
      console.log('bye 👋');
      process.exit();
    },
  });
})();
