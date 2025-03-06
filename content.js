(() => {
    const STORAGE_KEY = "savedForms";

    function saveFormData() {
        const inputs = document.querySelectorAll("input, textarea, select");
        let formData = {};

        inputs.forEach(input => {
            if (input.type !== "password" && input.name) {
                formData[input.name] = input.value;
            }
        });

        chrome.storage.local.get([STORAGE_KEY], (result) => {
            let savedForms = result[STORAGE_KEY] || [];
            savedForms.push(formData);
            chrome.storage.local.set({ [STORAGE_KEY]: savedForms }, () => {
                alert("Form data saved!");
            });
        });
    }

    function loadFormData() {
        chrome.storage.local.get([STORAGE_KEY], (result) => {
            let savedForms = result[STORAGE_KEY] || [];
            if (savedForms.length > 0) {
                let lastForm = savedForms[savedForms.length - 1];
                Object.entries(lastForm).forEach(([key, value]) => {
                    let input = document.querySelector(`[name="${key}"]`);
                    if (input) input.value = value;
                });
                alert("Form data restored!");
            } else {
                alert("No saved form data found.");
            }
        });
    }

    // Add a save button to the page dynamically
    function addSaveButton() {
        let existingButton = document.getElementById("form-saver-btn");
        if (existingButton) return;

        let button = document.createElement("button");
        button.id = "form-saver-btn";
        button.textContent = "Save Form Data";
        button.style.position = "fixed";
        button.style.bottom = "10px";
        button.style.right = "10px";
        button.style.padding = "10px";
        button.style.background = "#007bff";
        button.style.color = "white";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.zIndex = "9999";

        button.addEventListener("click", saveFormData);
        document.body.appendChild(button);
    }

    // Listen for shortcut (Ctrl + Shift + F)
    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "autofill_form") {
            loadFormData();
        }
    });

    // Add button when the page loads
    window.addEventListener("load", addSaveButton);
})();