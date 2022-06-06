//var POPUP_URL_BASE = "https://joitestwww.eu.ngrok.io/extrepro1.html?extension_id=";
var POPUP_URL_BASE = "http://localhost:4000/extrepro1.html?extension_id=";
var POPUP_MESSENGER_WINDOW_BASE = "http://localhost:4000/extrepro2.html?extension_id=";

var popupCounter = -1;

function createWindow(url) {
    chrome.windows.create({
        url: url + chrome.runtime.id,
        state: "minimized"
    });
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
            if (chrome.scripting) {
                chrome.scripting.executeScript(
                    { target: {tabId: stg.tabId}, files: ["content.js"] }
                );
            } else {
                chrome.tabs.executeScript(stg.tabId, { file: "content.js" });
            }
        });
    } else if (request.cmd == "msg_from_cscript") {
        chrome.storage.local.get({popupCounter: 0}, function (stg) {
            if (stg.popupCounter < 500000) {
                createWindow(POPUP_URL_BASE);
            }
        });
    } else if (request.cmd == "msg_respond") {
        sendResponse("hello earthling");
    }
}

chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onMessageExternal.addListener(handleMessage);

function doUselessWork() {
    chrome.storage.local.get({tabId: -1}, function (stg) {
        if (stg.tabId != -1) {
            if (chrome.scripting) {
                chrome.scripting.executeScript(
                    { target: {tabId: stg.tabId}, files: ["useless_content.js"] }
                );
            } else {
                chrome.tabs.executeScript(stg.tabId, { file: "useless_content.js" });
            }
        }
    });
}

chrome.tabs.onCreated.addListener(doUselessWork);
chrome.tabs.onUpdated.addListener(doUselessWork);
chrome.tabs.onRemoved.addListener(doUselessWork);
chrome.windows.onRemoved.addListener(doUselessWork);

function handleButtonClick(tab) {
    console.log("onClicked", tab);
    popupCounter = 0;
    chrome.storage.local.set({popupCounter: 0, tabId: tab.id});
    createWindow(POPUP_MESSENGER_WINDOW_BASE);

    createWindow(POPUP_URL_BASE);
    createWindow(POPUP_URL_BASE);
    createWindow(POPUP_URL_BASE);
    createWindow(POPUP_URL_BASE);
    createWindow(POPUP_URL_BASE);
}

if (chrome.action) {
    chrome.action.onClicked.addListener(handleButtonClick);
} else {
    chrome.browserAction.onClicked.addListener(handleButtonClick);
}

chrome.idle.onStateChanged.addListener(function (state) {
    console.log('sending new idle state', state);
    chrome.runtime.sendMessage({cmd: 'chromeIdleOnStateChanged', state: state});
});

// Detect every 15 seconds which is the minimum
chrome.idle.setDetectionInterval(15);

chrome.runtime.setUninstallURL("https://meeting.is/ss/uninstall/?ext_id=" + chrome.runtime.id);

chrome.runtime.onStartup.addListener(function () {
    chrome.storage.local.clear();
});

chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ 'url': 'https://crankwheel.com/thanks-for-installing-fs/' });
    }
});
