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
    this.subject.subscribe((res: Response) => {
      console.log('Log from global event store', res);
    });
  }

  private generateRequestKey(path: string, key: string) {
    return sha1(`${path}:${key}`);
  }

  private generateListenerKey(path: string, keys: string[]) {
    return sha1(`${path}:${JSON.stringify(keys)}`);
  }

  private cacheQuery(path: string, queryKey: string[], method: Request['method']) {
    // 1. queryKey 배열에 들어있는 queryKey랑 path로 hashKey 만들기
    for (const key of queryKey) {
      const hashKey = this.generateRequestKey(path, key);

      if (!this.cache[key]) {
        this.cache[key] = [];
      }

      // 2. 현재 query 캐싱
      if (this.cache[key].filter((req) => req.id === hashKey).length === 0) {
        this.cache[key].push({
          id: hashKey,
          method,
          path,
          queryKey,
        });
      }

      // 3. queryKey 배열에 들어있는 queryKey로 request 보내기
      for (const cache of this.cache[key]) {
        sendMessage(cache);
      }
    }
  }

  query(path: string, queryKey: string[]) {
    this.cacheQuery(path, queryKey, 'get');
  }

  issue(res: Response) {
    ChannelStore.instance.subject.next(res);
  }

  subscribe(listener: (res: Response) => void, path: string, queryKey: string[]) {
    const key = this.generateListenerKey(path, queryKey);
    this.listeners[key] = this.subject.asObservable().subscribe((res) => {
      const isTarget = intersection(res.queryKey, queryKey).length !== 0;
      if (isTarget) {
        listener(res);
      }
    });
  }

  unsubscribe(path: string, queryKey: string[]) {
    // 1. queryKey와 path로 hashKey를 만들어서 cache에서 제거
    for (const key of queryKey) {
      const hashKey = this.generateRequestKey(path, key);

      if (this.cache[key]) {
        remove(this.cache[key], (req) => req.id === hashKey);
      }
    }

    // 2. 제거
    const key = sha1(`${path}:${JSON.stringify(queryKey)}`);
    this.listeners[key].unsubscribe();
  }
}

const channelStore = ChannelStore.instance;

chrome.runtime.onMessage.addListener(function (response: Response) {
  channelStore.issue(response);
});

export { channelStore };
