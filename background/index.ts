import { httpClient } from './libs/http-client';

// Query Key만들어서 content에서 어떤 데이터를 요청했는지 알아야함
function sendToContent({
  method,
  queryKey,
  data,
  error,
}: {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  queryKey: string[];
  data?: any;
  error?: any;
}) {
  console.log('Send to content');
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { data, error, queryKey, method });
    }
  });
}

interface Request {
  method?: keyof typeof httpClient;
  path: string;
  data?: Record<string, any>;
  queryKey: string[];
}

function initialize() {
  chrome.runtime.onMessage.addListener(async function (request: Request) {
    let { method } = request;
    const { path, queryKey, data } = request;

    console.log('Receive from content');
    method ??= 'get';

    try {
      const result = await httpClient[method](path, data);

      sendToContent({
        data: result,
        queryKey,
        method,
      });
    } catch (error) {
      const { message } = error as Error;

      sendToContent({
        error: message,
        queryKey,
        method,
      });
    }
  });
}

initialize();
