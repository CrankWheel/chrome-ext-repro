//var POPUP_URL_BASE = "https://joitestwww.eu.ngrok.io/extrepro1.html?extension_id=";
var POPUP_URL_BASE = "http://localhost:4000/extrepro1.html?extension_id=";

var popupCounter = -1;

function createWindow() {
    chrome.windows.create({url: POPUP_URL_BASE + chrome.runtime.id});
}

function handleMessage(request, sender, sendResponse) {
    console.log(request.cmd);
    if (request.cmd == "msg_from_webpage") {
        chrome.windows.remove(sender.tab.windowId);
        chrome.storage.local.get({popupCounter: 0, tabId: -1}, function (stg) {
            if (popupCounter == -1) {
                // i.e., only refresh the local var if the service worker
                // has been shut down since last time
                popupCounter = stg.popupCounter;
            }
            console.log("fromstorage", popupCounter, stg.popupCounter, stg.tabId);
            chrome.storage.local.set({popupCounter: popupCounter + 1});
            popupCounter += 1;
            chrome.scripting.executeScript(
                { target: {tabId: stg.tabId}, files: ["content.js"] }
            );
        });
    } else if (request.cmd == "msg_from_cscript") {
        chrome.storage.local.get({popupCounter: 0}, function (stg) {
            if (stg.popupCounter < 500000) {
                createWindow();
            }
        });
    }
}

chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onMessageExternal.addListener(handleMessage);

function doUselessWork() {
    chrome.storage.local.get({tabId: -1}, function (stg) {
        if (stg.tabId != -1) {
            chrome.scripting.executeScript(
                { target: {tabId: stg.tabId}, files: ["useless_content.js"] }
            );
        }
    });
}

chrome.tabs.onCreated.addListener(doUselessWork);
chrome.tabs.onUpdated.addListener(doUselessWork);
chrome.tabs.onRemoved.addListener(doUselessWork);

chrome.action.onClicked.addListener(function (tab) {
    console.log("onClicked", tab);
    popupCounter = 0;
    chrome.storage.local.set({popupCounter: 0, tabId: tab.id});
    createWindow();
    createWindow();
    createWindow();
    createWindow();
    createWindow();
    createWindow();
    createWindow();
    createWindow();
    createWindow();
    createWindow();
    createWindow();
    createWindow();
    createWindow();
    createWindow();
    createWindow();
});