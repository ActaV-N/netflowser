import { httpClient } from './libs/http-client';

// Query Key만들어서 content에서 어떤 데이터를 요청했는지 알아야함
function sendToContent({ queryKey, data, error }: { queryKey: string[]; data?: any; error?: any }) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { data, error, queryKey });
    }
  });
}

interface Request {
  method?: keyof typeof httpClient;
  path: string;
  data?: any;
  queryKey: string[];
}

chrome.runtime.onMessage.addListener(async function (request: Request) {
  let { method } = request;
  const { path, data, queryKey } = request;

  method ??= 'get';

  try {
    const result = await httpClient[method](path, data);
    console.log(result);
    sendToContent({
      data: result,
      queryKey,
    });
  } catch (error) {
    console.log(error);
    sendToContent({
      error,
      queryKey,
    });
  }
});
