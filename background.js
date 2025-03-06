chrome.commands.onCommand.addListener((command) => {
    if (command === "autofill_form") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    chrome.runtime.sendMessage({ action: "autofill_form" });
                }
            });
        });
    }
});