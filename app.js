const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/register-url", (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.redirect("/notFound");
  }
});

app.get("*", (req, res) => {
  res.status(404).json({
    err: "invalid url",
  });
});

app.listen(PORT, () => {
  console.log("server is running at: " + PORT);
});
