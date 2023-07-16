import Koa from 'koa';
import Router from '@koa/router';

const port = process.env.PORT;

const app = new Koa();
const router = new Router();

router.get('/ping', async (ctx) => {
  ctx.body = 'pong';
});

app.use(router.middleware());

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
