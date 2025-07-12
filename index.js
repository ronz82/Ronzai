const axios = require("axios");
‎const readline = require("readline");
‎
‎const rl = readline.createInterface({
‎  input: process.stdin,
‎  output: process.stdout
‎});
‎
‎const API_KEY = "";
‎
‎rl.question("Tanya AI: ", async (question) => {
‎  const response = await axios.post(
‎    "https://api.openai.com/v1/chat/completions",
‎    {
‎      model: "gpt-3.5-turbo",
‎      messages: [{ role: "user", content: question }]
‎    },
‎    {
‎      headers: {
‎        Authorization: `Bearer ${API_KEY}`,
‎        "Content-Type": "application/json"
‎      }
‎    }
‎  );
‎
‎  console.log("\nJawaban:", response.data.choices[0].message.content);
‎  rl.close();
‎});
‎
