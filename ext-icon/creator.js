var continueDoingStuff = true;

function doStuffOnTimeout() {
    stuff();
    if (continueDoingStuff) setTimeout(doStuffOnTimeout, 10);
}

doStuffOnTimeout();

var redIcon = false;
var count = 0;

function stuff() {
    redIcon = !redIcon;
    count += 1;
    chrome.browserAction.setBadgeText({text: "" + count});
    var iconFile = "x19.png";
    if (redIcon) iconFile = "cwicon19red.png";
    chrome.browserAction.setIcon({path: iconFile});
}

function clickHandler() {
    continueDoingStuff = !continueDoingStuff;
    if (continueDoingStuff) {
        doStuffOnTimeout();
    }
}
document.getElementById('toggle-btn').addEventListener('click', clickHandler);
