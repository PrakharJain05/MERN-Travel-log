const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const favicon = require("serve-favicon");
const path = require("path");

const middleware = require("./middleware");
const logs = require("./routes/logs");

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World 🌏",
  });
});

app.use("/routes/logs", logs);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log("Connected");
});
