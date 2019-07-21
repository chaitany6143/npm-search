chrome.runtime.onMessage.addListener(request => {
  if (request.type === 'npmSearch' && window.getSelection()) {
    let value = window.getSelection().toString();
    window.open(`https://www.npmjs.com/package/${value}`);
  }
});