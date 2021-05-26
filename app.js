require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const cors = require("cors");
const validUrl = require("valid-url");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}.ozhsq.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const urlSchema = {
  _id: String,
  url: String,
};

const urlmongo = mongoose.model("short-urls", urlSchema);

app.post("/register-url", (req, res) => {
  // const id = shortid.generate();
  const { url } = req.body;
  if (!url || !validUrl.isUri(url)) {
    res.redirect("/notFound");
  }

  urlmongo.findOne({ url }, (err, data) => {
    if (data) {
      res.status(200).json({
        url: `http://localhost:8000/${data._id}`,
      });
    } else {
      const id = shortid.generate();
      try {
        urlmongo.insertMany({
          _id: id,
          url: url,
        });
      } catch (err) {
        res.status(500).json({
          err: "Inserting data failed",
        });
      }
      console.log(id);
      res.status(200).json({
        message: `http://localhost:8000/${id}`,
      });
    }
  });
});

app.get("/:id", (req, res) => {
  urlmongo.findById(req.params.id, (err, data) => {
    if (data) {
      res.redirect(data.url);
    } else {
      res.json({
        message: "invalid url",
      });
    }
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    err: "invalid url",
  });
});

app.listen(PORT, () => {
  console.log("server is running at: " + PORT);
});
