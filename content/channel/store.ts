import { Subject } from 'rxjs';
import * as channels from './const';

interface BackgroundEvent {
  message: keyof typeof channels;
  data: any;
}

class ChannelStore {
  private subject: Subject<BackgroundEvent>;
  private instance?: ChannelStore;

  private constructor() {
    this.subject = new Subject<BackgroundEvent>();
  }

  getStore(): ChannelStore {
    if (!this.instance) {
      this.instance = new ChannelStore();
    }

    return this.instance;
  }
}
export { ChannelStore };

chrome.runtime.sendMessage({ path: '/ping' });
// chrome.runtime.onMessage.addListener(function (request) {

// });
