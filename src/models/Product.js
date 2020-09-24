const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  Name: String,
  Quantity: Number,
  Size: Number,
  Supplier: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
  ],
});

module.exports = mongoose.model("Product", ProductSchema);
