const mongoose = require("mongoose");
const Product = require("../models/Product");

module.exports = async function ProductQuantity(id, Quantity, type) {
  try {
    const product = await Product.findById(id);
    if (type === 1) {
      product.Quantity += Quantity;
    } else if (type === 2) {
      product.Quantity -= Quantity;
    }

    product.save();

    return true;
  } catch (error) {
    return false;
  }
};
