chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getStorage") {
    sendResponse(localStorage);
  } else {
    sendResponse({}); // snub them.
  }
});