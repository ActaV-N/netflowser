import { Subject } from 'rxjs';

interface Request {
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  data?: any;
  queryKey: string[];
}

interface Response<T = any> {
  data?: T;
  error?: any;
  queryKey: string[];
}

function sendMessage(req: Request) {
  chrome.runtime.sendMessage(req);
}
class ChannelStore {
  public static instance: ChannelStore = new this();
  private subject: Subject<Response>;

  private constructor() {
    this.subject = new Subject<Response>();
    this.subject.subscribe((res: Response) => {
      console.log('Log from global event store', res);
    });
  }

  get(path: string, queryKey: string[]) {
    sendMessage({ method: 'get', path, queryKey });
  }

  issue(res: Response) {
    ChannelStore.instance.subject.next(res);
  }
}

const channelStore = ChannelStore.instance;

chrome.runtime.onMessage.addListener(function (response: Response) {
  channelStore.issue(response);
});

export { channelStore };
