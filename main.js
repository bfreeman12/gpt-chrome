const apiKeySubmit = document.getElementById("apiKeySubmit");
const apiKeyInput = document.getElementById("apiKeyInput");
const queryInput = document.getElementById("queryInput");
const querySubmit = document.getElementById("querySubmit");
const toClipboard = document.getElementById("toClipboard");
const gptResponseP = document.getElementById("gptResponse");
const responseWrapper = document.getElementById("responseWrapper");

window.onload = () => {
  apiKeySubmit.onclick = () => {
    const apiKeyValue = apiKeyInput.value
    chrome.storage.local.set({ 'apikey': apiKeyValue })
  }
  querySubmit.onclick = () => {
    const prefs = {
      queryInput: queryInput.value,
    };
    chrome.runtime.sendMessage({ event: "initQuery", prefs });
  };

  chrome.runtime.onMessage.addListener((data) => {
    let responseText = JSON.stringify(data["gptResponseData"]);
    const formattedResponseText = responseText.replaceAll("\\n", "");
    const newformattedResponseText = formattedResponseText.replaceAll("\\", "").slice(1,-1);
    gptResponseP.innerText = newformattedResponseText;
    function copyButton() {
      var element = document.createElement('button')
      element.id = 'toClipboard'
      element.innerHTML = 'Copy'
      element.onclick = () => {
        const valueToBeCopied = gptResponseP.textContent;
        navigator.clipboard.writeText(valueToBeCopied);
      };
      return element;
    }
    if (!document.getElementById('toClipboard')) {
      responseWrapper.appendChild(copyButton())
    }
  });
}
