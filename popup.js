document.getElementById("myButton").addEventListener("click", function() {
    document.getElementById("message").textContent = "Button Clicked!";
    
    // Example of interacting with the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => alert('Hello from the extension!')
        });
    });
});
