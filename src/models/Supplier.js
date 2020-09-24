const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  Name: String,
  Cnpj: Number,
  Product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Supplier", SupplierSchema);
