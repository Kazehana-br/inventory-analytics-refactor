const mongoose = require("mongoose");

const LocalSchema = new mongoose.Schema({
  Name: String,
  Warehouse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
  ],
});

module.exports = mongoose.model("Local", LocalSchema);
