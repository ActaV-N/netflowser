import { intersection, remove } from 'lodash';
import { Subject, Subscription } from 'rxjs';
import sha1 from 'sha1';

export interface Request {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  data?: any;
  queryKey: string[];
}

export interface Response<T = any> {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  data?: T;
  error?: any;
  queryKey: string[];
}

function sendMessage(req: Request) {
  chrome.runtime.sendMessage(req);
}
export class ChannelStore {
  public static instance: ChannelStore = new this();
  private subject: Subject<Response>;
  private cache: Record<string, ({ id: string } & Request)[]> = {};
  private listeners: Record<string, Subscription> = {};

  private constructor() {
    this.subject = new Subject<Response>();
  }

  private generateRequestKey(path: string, key: string, method: Request['method']) {
    return sha1(`${path}:${key}:${method}`);
  }

  private generateListenerKey(path: string, keys: string[], method: Request['method']) {
    return sha1(`${path}:${JSON.stringify(keys)}:${method}`);
  }

  private cacheQuery(query: { method: Request['method']; path: string; queryKey: string[] }) {
    const { method, path, queryKey } = query;
    // 1. queryKey 배열에 들어있는 queryKey랑 path로 hashKey 만들기
    for (const key of queryKey) {
      const hashKey = this.generateRequestKey(path, key, method);

      if (!this.cache[key]) {
        this.cache[key] = [];
      }

      // 3. 현재 query 캐싱
      if (this.cache[key].filter((req) => req.id === hashKey).length === 0 && method === 'get') {
        this.cache[key].unshift({ id: hashKey, method, path, queryKey });
      }
    }
  }

  private callCachedQuery(queryKey: string[]) {
    for (const key of queryKey) {
      for (const cache of this.cache[key]) {
        sendMessage(cache);
      }
    }
  }

  query(path: string, queryKey: string[]) {
    const query = { method: 'get', path, queryKey } as const;
    sendMessage(query);
    this.cacheQuery(query);
  }

  mutate(path: string, queryKey: string[], method: Request['method'], data?: Record<string, any>) {
    const query = { method, path, queryKey, data } as const;
    sendMessage(query);
    this.callCachedQuery(queryKey);
  }

  issue(res: Response) {
    ChannelStore.instance.subject.next(res);
  }

  subscribe(listener: (res: Response) => void, path: string, queryKey: string[], method: Request['method'] = 'get') {
    const key = this.generateListenerKey(path, queryKey, method);
    this.listeners[key] = this.subject.asObservable().subscribe((res) => {
      const isTarget = intersection(res.queryKey, queryKey).length !== 0;
      if (isTarget && res.method === method) {
        listener(res);
      }
    });
  }

  unsubscribe(path: string, queryKey: string[], method: Request['method'] = 'get') {
    // 1. queryKey와 path로 hashKey를 만들어서 cache에서 제거
    for (const key of queryKey) {
      const hashKey = this.generateRequestKey(path, key, method);

      if (this.cache[key]) {
        remove(this.cache[key], (req) => req.id === hashKey);
      }
    }

    // 2. 제거
    const key = this.generateListenerKey(path, queryKey, method);
    this.listeners[key].unsubscribe();
  }
}

const channelStore = ChannelStore.instance;

chrome.runtime.onMessage.addListener(function (response: Response) {
  channelStore.issue(response);
});

export { channelStore };
