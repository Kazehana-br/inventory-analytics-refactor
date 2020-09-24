const express = require("express");
const mongoose = require("mongoose");
require("dotenv-safe").config();
const cors = require("cors");
const routes = require("./routes");
const { ipMiddleware } = require("./middleware/ipfilter");
const app = express();
app.use(ipMiddleware);
mongoose.connect(process.env.mongotests, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);
const server = app.listen(process.env.PORT || 8080);

module.exports = { app, server };
