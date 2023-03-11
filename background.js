chrome.runtime.onMessage.addListener((data) => {
  const { event, prefs } = data;
  switch (event) {
    case "initQuery":
      handleQuery(prefs);
      break;

    default:
      break;
  }
});
const handleQuery = (prefs) => {
  const apikey = chrome.storage.local.get(['apikey'], function(result){
    const api_payload = {
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      max_tokens: 1000,
      messages: [{"role": "user", "content":prefs.queryInput}]
  
    };
    var url = "https://api.openai.com/v1/chat/completions";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${result.apikey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(api_payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const gptResponseData = data["choices"][0]["message"]["content"];
        chrome.runtime.sendMessage({
          event: "gptresponse",
          gptResponseData,
        });
      })
      .catch((error) => {
        console.log("err " + error);
      });
  });
}
  

