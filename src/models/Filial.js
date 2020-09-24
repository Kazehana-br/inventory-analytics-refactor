const mongoose = require("mongoose");

const FilialSchema = new mongoose.Schema({
  Name: String,
  Warehouse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
  ],
});

module.exports = mongoose.model("Filial", FilialSchema);
