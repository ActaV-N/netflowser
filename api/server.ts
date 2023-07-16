import Koa from 'koa';
import Router from '@koa/router';
import { dependencyInjector, uuidMiddleware } from '~api/middleware';

const port = process.env.PORT;

const app = new Koa();
const router = new Router();

router.get('/ping', async (ctx) => {
  ctx.body = 'pong';
});

app.use(uuidMiddleware);
app.use(dependencyInjector);

app.use(router.middleware());

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
