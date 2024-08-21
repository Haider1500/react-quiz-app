const express = require("express");
const data = require("../src/questions.json");
require("dotenv").config()

const app = express();
const PORT = 4000;
const apiurl =process.env.
  

const { questions } = data;

app.get("/questions", (req, res) => {
  res.set(
    "Access-Control-Allow-Origin",
    `${apiurl}`
  );
  res.send(questions);
});

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
