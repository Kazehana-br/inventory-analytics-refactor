const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  Name: String,
  Date: Date,
  Url: String,
});

module.exports = mongoose.model("Document", DocumentSchema);
