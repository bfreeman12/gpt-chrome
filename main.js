const apiKeySubmit = document.getElementById("apiKeySubmit");
const apiKeyInput = document.getElementById("apiKeyInput");
const queryInput = document.getElementById("queryInput");
const querySubmit = document.getElementById("querySubmit");

apiKeySubmit.onclick = () => {
  chrome.storage.local.set({ apikey: apiKeyInput.value });
};

querySubmit.onclick = () => {
  const prefs = {
    queryInput: queryInput.value,
    apikey: apiKeyInput.value,
  };
  chrome.runtime.sendMessage({ event: "initQuery", prefs });
};

chrome.runtime.onMessage.addListener((data) => {
  let responseText = JSON.stringify(data["gptResponseData"]);
  const formattedResponseText = responseText.replaceAll("\\n", " ");
  const newformattedResponseText = formattedResponseText.replaceAll("\\", "");
  const gptResponseP = document.getElementById("gptResponse");
  gptResponseP.innerHTML = newformattedResponseText;
});

// in the future will need something to hide the api key input and save
// the api locally
