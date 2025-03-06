document.getElementById("autofill").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                chrome.runtime.sendMessage({ action: "autofill_form" });
            }
        });
    });
});

document.getElementById("clearData").addEventListener("click", () => {
    chrome.storage.local.remove("savedForms", () => {
        alert("All saved forms have been cleared!");
    });
});