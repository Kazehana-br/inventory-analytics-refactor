const mongoose = require("mongoose");

const WarehouseSchema = new mongoose.Schema({
  WarehouseType: Number,
  Local: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Local",
  },
  Filial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Filial",
  },
  Product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  ProductInput: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductInput",
    },
  ],
  ProductOutput: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductOutput",
    },
  ],
  Size: Number,
  SizeVirtual: Number,
});

module.exports = mongoose.model("Warehouse", WarehouseSchema);
