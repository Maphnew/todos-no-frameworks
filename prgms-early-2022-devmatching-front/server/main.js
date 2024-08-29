const express = require("express");
const cors = require("cors");
const app = express();
const langs = [
  "javascript",
  "typescript",
  "go",
  "pythin",
  "java",
  "kotlin",
  "ruby",
  "scala",
  "swift",
  "elm",
  "haskell",
  "unity",
  "rust",
  "c",
  "c#",
];

app.use(
  cors({
    origin: "http://127.0.0.1:5501",
  })
);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/languages", function (req, res) {
  const keyword = req.query.keyword;
  const langsMatchesKeyword = langs.filter((lang) => {
    return lang.includes(keyword);
  });
  res.send(langsMatchesKeyword);
});

app.listen(5000);
