const express = require("express");
const data = require("../src/questions.json");

const app = express();
const PORT = 4000;

const { questions } = data;

app.get("/questions", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send(questions);
});

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
