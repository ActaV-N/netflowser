import { Subject } from 'rxjs';
import sha1 from 'sha1';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

function sendMessage(req: ChannelRequest) {
  chrome.runtime.sendMessage(req);
}

type Handler<T = any> = (res: ChannelResponse<T>) => any;

type Listener<T = any> = {
  id: string;
  handler: Handler<T>;
  path: ChannelRequest['path'];
  method: ChannelRequest['method'];
  queryKey: ChannelRequest['queryKey'];
};
export class ChannelStore {
  public static instance: ChannelStore = new this();
  private subject: Subject<ChannelResponse>;
  private listeners: Listener[] = [];

  private constructor() {
    this.subject = new Subject<ChannelResponse>();
    this.subject.subscribe((res) => {
      this.listeners.map((listener) => {
        if (listener.id === res.requestId) {
          listener.handler(res);
        }
      });
    });
  }

  private generateRequestKey(path: string, key: string, method: Method) {
    return sha1(`${path}:${key}:${method}`);
  }

  private generateKey(path: string, keys: string[], method: Method, uniqStr?: string) {
    return sha1(`${path}:${JSON.stringify(keys)}:${method}:${uniqStr ?? ''}`);
  }

  query(path: string, queryKey: string[], uniqStr?: string) {
    const key = this.generateKey(path, queryKey, 'get', uniqStr);
    const query = { id: key, method: 'get', path, queryKey } as const;
    sendMessage(query);
  }

  mutate(path: string, queryKey: string[], method: Method, data?: Record<string, any>, uniqStr?: string) {
    const key = this.generateKey(path, queryKey, method, uniqStr);
    const query = { id: key, method, path, queryKey, data } as const;
    sendMessage(query);
  }

  issue(res: ChannelResponse) {
    ChannelStore.instance.subject.next(res);
  }

  subscribe(
    handler: (res: ChannelResponse) => void,
    path: string,
    queryKey: string[],
    method: Method = 'get',
    uniqStr?: string,
  ) {
    const key = this.generateKey(path, queryKey, method, uniqStr);
    this.listeners.push({
      id: key,
      path,
      method,
      queryKey,
      handler,
    });
  }

  unsubscribe(path: string, queryKey: string[], method: Method = 'get', uniqStr?: string) {
    const key = this.generateKey(path, queryKey, method, uniqStr);
    const idx = this.listeners.findIndex((listener) => listener.id === key);
    this.listeners.splice(idx, 1);
  }
}

const channelStore = ChannelStore.instance;

chrome.runtime.onMessage.addListener(function (response: ChannelResponse) {
  channelStore.issue(response);
});

export { channelStore };
