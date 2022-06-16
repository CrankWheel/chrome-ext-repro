function updateStuff() {
    let stamp = Date.now();
    console.warn(`Updating stuff: ${stamp}`);
    let now = new Date(stamp);
    chrome.browserAction.setBadgeText({text: `${now.getMinutes()}:${now.getSeconds()}`}, () => { console.warn(`setBadgeText done: ${stamp}`); });

    var iconFile = "x19.png";
    if (now.getSeconds() % 2 == 0) iconFile = "cwicon19red.png";
    console.warn(`setting icon: ${stamp}`)
    chrome.browserAction.setIcon({path: iconFile}, () => { console.warn(`set icon done: ${stamp}`); });

    // When loaded unpacked we can do less than one minute. This is timed
    // to be right after the background page unloads.
    console.warn(`clearning alarms: ${stamp}`);
    chrome.alarms.clearAll(() => { console.warn(`clear alarms done: ${stamp}`); });

    chrome.alarms.create({when: Date.now() + 17000});

    console.warn(`updateStuff() done: ${stamp}`);

    //setTimeout(updateStuff, 100);
}

chrome.browserAction.onClicked.addListener(function () {
    console.warn('BrowserAction Clicked');
    updateStuff();
    console.warn('BrowserAction Updated');

    //createIconSwitchingPageIfNotCreated();

    //chrome.alarms.create({periodInMinutes: 1});
});

chrome.alarms.onAlarm.addListener(() => {
  console.warn('Alarm triggered');
  updateStuff();
  console.warn('Alarm update done');
});

function createIconSwitchingPageIfNotCreated() {
    if (chrome.extension.getViews().length == 1) {
        chrome.tabs.create({url: "creator.html"});
    }
}
