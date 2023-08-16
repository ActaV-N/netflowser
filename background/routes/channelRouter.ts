type ChannelHandler = (req: ChannelRequest) => any | Promise<any>;

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

  public async handleResponse(req: ChannelRequest) {
    const { method, path } = req;

    for (const middleware of this.middleware) {
      if (method === middleware.method && path === middleware.path) {
        return middleware.handler(req);
      }
    }
  }
}

export const channelInstance = ChannelRouter.getInstance();

channelInstance.get('/ping', () => {
  return 'pong';
});
