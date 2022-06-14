function doStuff() {
    chrome.runtime.sendMessage({msg: "hello world"});
    window.close();
}

doStuff();