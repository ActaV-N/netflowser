import { channelInstance } from './routes';
import './storage';

(async () => {
  function sendToContent({
    id,
    method,
    queryKey,
    data,
    error,
  }: {
    id: string;
    method: Method;
    queryKey: string[];
    data?: any;
    error?: any;
  }) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { requestId: id, data, error, queryKey, method });
      }
    });
  }

  chrome.runtime.onMessage.addListener(async function (request: ChannelRequest) {
    const result = await channelInstance.handleResponse(request);

    const { id, queryKey } = request;
    const method = request.method ?? 'get';

    try {
      sendToContent({
        id,
        data: result,
        queryKey,
        method,
      });
    } catch (error) {
      const { message } = error as Error;
      sendToContent({
        id,
        error: message,
        queryKey,
        method,
      });
    }
  });
})();
