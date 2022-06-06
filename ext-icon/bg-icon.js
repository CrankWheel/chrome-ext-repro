var redIcon = false;
var count = Math.floor(Math.random() * 10000);

function updateStuff() {
    redIcon = !redIcon;
    count += 1;
    chrome.browserAction.setBadgeText({text: "" + count});
    var iconFile = "x19.png";
    if (redIcon) iconFile = "cwicon19red.png";
    chrome.browserAction.setIcon({path: iconFile});

    // When loaded unpacked we can do less than one minute. This is timed
    // to be right after the background page unloads.
    chrome.alarms.clearAll();
    chrome.alarms.create({when: Date.now() + 17000});

    //setTimeout(updateStuff, 100);
}

chrome.browserAction.onClicked.addListener(function () {
    updateStuff();

    //createIconSwitchingPageIfNotCreated();

    //chrome.alarms.create({periodInMinutes: 1});
});

chrome.alarms.onAlarm.addListener(updateStuff);

function createIconSwitchingPageIfNotCreated() {
    if (chrome.extension.getViews().length == 1) {
        chrome.tabs.create({url: "creator.html"});
    }
}
