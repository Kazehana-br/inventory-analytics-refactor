const mongoose = require("mongoose");
const Product = require("../models/App/Product");

module.exports = async function ProductQuantity(id, Quantity, type) {
  try {
    const product = await Product.findById(id);
    if (type === 1) {
      product.Quantity += Quantity;
    } else {
      product.Quantity -= Quantity;
    }

    product.save();

    return true;
  } catch (error) {
    return false;
  }
};
