// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchWord",
    title: "查询 \"%s\"",
    contexts: ["selection"]
  });
});

// 处理右键菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchWord") {
    const word = info.selectionText;
    // 打开popup并传递选中的文本
    chrome.storage.local.set({ 'selectedWord': word }, function() {
      chrome.action.openPopup();
    });
  }
});
