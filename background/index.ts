import { CONNECTION, _CONNECTION } from './channel';

function sentToContent(message: string) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { message });
    }
  });
}

function connectionTester() {
  sentToContent(_CONNECTION);
}

chrome.runtime.onMessage.addListener(async function (request) {
  if (request.message === CONNECTION) {
    const res = await fetch('http://localhost:3000/ping');
    console.log(res);

    connectionTester();
  }
});
