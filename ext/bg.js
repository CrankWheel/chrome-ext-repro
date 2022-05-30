var POPUP_URL_BASE = "https://joitestwww.eu.ngrok.io/extrepro1.html?extension_id=";

function getTabId(cb) {
    chrome.storage.local.get({tabId: -1}, function (store) {
        cb(store.tabId);
    })
}

function createWindow() {
    chrome.windows.create({url: POPUP_URL_BASE + chrome.runtime.id});
}

function handleMessage(request, sender, sendResponse) {
    if (request.cmd == "msg_from_webpage") {
        chrome.windows.remove(sender.tab.windowId);
        chrome.storage.local.get({popupCounter: 0, tabId: -1}, function (stg) {
            console.log("fromstorage", stg.popupCounter, stg.tabId);
            chrome.storage.local.set({popupCounter: stg.popupCounter + 1});
            chrome.scripting.executeScript(
                { target: {tabId: stg.tabId}, files: ["content.js"] },
                function () {
                    console.log(chrome.runtime.lastError);
                }
            );
        });
    } else if (request.cmd == "msg_from_cscript") {
        chrome.storage.local.get({popupCounter: 0}, function (stg) {
            if (stg.popupCounter < 5000) {
                createWindow();
            }
        });
    }
}

chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onMessageExternal.addListener(handleMessage);

chrome.action.onClicked.addListener(function (tab) {
    console.log("onClicked", tab);
    chrome.storage.local.set({popupCounter: 0, tabId: tab.id});
    createWindow();
});
