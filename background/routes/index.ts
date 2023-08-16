type ChannelHandler = (req: ChannelRequest) => any;

interface Middleware {
  path: string;
  method: Method;
  handler: ChannelHandler;
}

class ChannelRouter {
  private static instance: ChannelRouter;
  private middleware: Middleware[] = [];

  private constructor() {}

  public get(path: string, handler: ChannelHandler) {
    this.middleware.push({
      method: 'get',
      path,
      handler,
    });
  }

  public post(path: string, handler: ChannelHandler) {
    this.middleware.push({
      method: 'post',
      path,
      handler,
    });
  }

  public put(path: string, handler: ChannelHandler) {
    this.middleware.push({
      method: 'put',
      path,
      handler,
    });
  }

  public patch(path: string, handler: ChannelHandler) {
    this.middleware.push({
      method: 'patch',
      path,
      handler,
    });
  }

  public delete(path: string, handler: ChannelHandler) {
    this.middleware.push({
      method: 'delete',
      path,
      handler,
    });
  }

  public static getInstance() {
    if (!ChannelRouter.instance) {
      ChannelRouter.instance = new ChannelRouter();
    }

    return ChannelRouter.instance;
  }

  public handleResponse(req: ChannelRequest) {
    const { method, path } = req;

    let res: any;

    this.middleware.forEach((middleware: Middleware) => {
      if (method === middleware.method && path === middleware.path) {
        res = middleware.handler(req);
      }
    });

    return res;
  }
}

export const channelInstance = ChannelRouter.getInstance();

channelInstance.get('/ping', () => {
  return 'pong';
});
