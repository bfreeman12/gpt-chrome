const apiKeySubmit = document.getElementById("apiKeySubmit");
const apiKeyInput = document.getElementById("apiKeyInput");
const queryInput = document.getElementById("queryInput");
const querySubmit = document.getElementById("querySubmit");
const toClipboard = document.getElementById("toClipboard");
const gptResponseP = document.getElementById("gptResponse");

querySubmit.onclick = () => {
  const prefs = {
    queryInput: queryInput.value,
    apikey: apiKeyInput.value,
  };
  chrome.runtime.sendMessage({ event: "initQuery", prefs });
};

chrome.runtime.onMessage.addListener((data) => {
  let responseText = JSON.stringify(data["gptResponseData"]);
  const formattedResponseText = responseText.replaceAll("\\n", "");
  const newformattedResponseText = formattedResponseText.replaceAll("\\", "");
  gptResponseP.innerHTML = newformattedResponseText;
});

// in the future will need something to hide the api key input and save
// the api locally
toClipboard.onclick = () => {
  const valueToBeCopied = gptResponseP.textContent;
  navigator.clipboard.writeText(valueToBeCopied);
};
