const mongoose = require("mongoose");

const ProductInputSchema = new mongoose.Schema({
  Name: String,
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  Document: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
  Quantity: Number,
  UnityPrice: Number,
  TotalPrice: Number,
  AverageCost: Number,
});

module.exports = mongoose.model("ProductInput", ProductInputSchema);
