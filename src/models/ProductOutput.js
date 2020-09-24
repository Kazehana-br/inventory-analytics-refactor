const mongoose = require("mongoose");

const ProductOutputSchema = new mongoose.Schema({
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
  Reason: String,
  Quantity: Number,
  UnityPrice: Number,
  TotalPrice: Number,
  CreateAt: Date
});

module.exports = mongoose.model("ProductOutput", ProductOutputSchema);
