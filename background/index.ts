function tester() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'Hello' });
    }
  });
}

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === 'clicked') {
    tester();
  }
});
