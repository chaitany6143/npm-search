chrome.runtime.onMessage.addListener(request => {
  if (request.type === 'npmSearch') {
    // DO SOMETHING
  }
});