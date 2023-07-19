import { httpClient } from './libs/http-client';

// Query Key만들어서 content에서 어떤 데이터를 요청했는지 알아야함
function sendToContent({ data, error }: { data?: any; error?: any }) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { data, error });
    }
  });
}

interface Request {
  method?: keyof typeof httpClient;
  path: string;
  data?: any;
}

chrome.runtime.onMessage.addListener(async function (request: Request) {
  let { method } = request;
  const { path, data } = request;

  method ??= 'get';

  try {
    const result = await httpClient[method](path, data);
    sendToContent({
      data: result,
    });
  } catch (error) {
    sendToContent({
      error,
    });
  }
});
