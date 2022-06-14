function updateStuff() {
    chrome.storage.local.get({redIcon: false, count: 0}, function (stg) {
        var redIcon = !stg.redIcon;
        var count = stg.count + 1;
        chrome.browserAction.setBadgeText({text: "" + count});
        var iconFile = "x19.png";
        if (redIcon) iconFile = "cwicon19red.png";
        chrome.browserAction.setIcon({path: iconFile});
        chrome.storage.local.set({redIcon, count});
        chrome.alarms.clearAll();
        chrome.alarms.create({when: Date.now() + 15300});
    });
}

chrome.alarms.onAlarm.addListener(createIconSwitchingPage);

chrome.browserAction.onClicked.addListener(function () {
    updateStuff();
});

chrome.runtime.onMessage.addListener(function (msg) {
    updateStuff();
});

function createIconSwitchingPage() {
    if (chrome.extension.getViews().length == 1) {
        chrome.windows.create({url: "creator.html", state: "minimized"});
    }
}
