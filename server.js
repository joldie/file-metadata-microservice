"use strict";

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.static("public"));

// Default landing page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint
app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  function(req, res, next) {
    req.name = req.file.originalname;
    req.type = req.file.mimetype;
    req.size = req.file.size;
    next();
  },
  (req, res) => {
    res.json({ name: req.name, type: req.type, size: req.size });
  }
);

// Listen for requests
var listener = app.listen(8080, () => {
  console.log("Listening on port " + listener.address().port);
});
