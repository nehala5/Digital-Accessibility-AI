chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "searchGoogle") {
        let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message.query)}`;
        chrome.tabs.create({ url: searchUrl });
    }
});
