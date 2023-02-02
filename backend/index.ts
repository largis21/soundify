import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("HEI");
});

app.listen(8080);
