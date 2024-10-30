chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "doSomething") {
      console.log("Background script received a message");
      sendResponse({status: "done"});
    }
  });