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
  console.log(prefs);
  const apikey = prefs.apikey;
  console.log(apikey);
  const api_payload = {
    model: "text-davinci-002",
    temperature: 0.5,
    max_tokens: 1000,
    prompt: prefs.queryInput,
  };
  var url = "https://api.openai.com/v1/completions";
  var bearer = "Bearer" + apikey;
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apikey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(api_payload),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const gptResponseData = data["choices"][0]["text"];
      chrome.runtime.sendMessage({
        event: "gptresponse",
        gptResponseData,
      });
    })
    .catch((error) => {
      console.log("err " + error);
    });
};
