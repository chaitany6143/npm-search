chrome.contextMenus.create({
  id: 'NPMSearch',
  title: 'Search for npm package..',
  contexts: ['all']
});

chrome.contextMenus.onClicked.addListener(() => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {
        type: 'npmSearch'
    });
  });
});