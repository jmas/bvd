chrome.webRequest.onHeadersReceived.addListener(
    ({type, url, responseHeaders}) => {
        if (type === 'media') {
            if (responseHeaders.some(({name, value}) => name.toLowerCase() === 'content-length' && Number(value) > 100000000)) {
                chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                    const activeTab = tabs[0];
                    if (activeTab.url !== url) {
                        chrome.tabs.update(activeTab.id, {url});
                    }
                });
            }
        }
    },
    {urls: ['*://*/*']},
    ['responseHeaders']
);
