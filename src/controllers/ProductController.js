const Product = require("../models/Product");
const ArrayIncludes = require("../utils/ArrayIncludes");

module.exports = {
  async index(request, response) {
    const produtos = await Product.find().populate("Supplier");
    return response.json(produtos);
  },
  async store(request, response) {
    const { Name, Size, Warehouse } = request.body;
    const produto = await Product.create({
      Name,
      Size,
      Quantity: 0,
    });
    return response.json(produto);
  },
  async show(request, response) {
    const id = request.params.id;
    const produto = await Product.findOne({ _id: id }).populate("Supplier");
    return response.json(produto);
  },
  async AddSupplier(request, response) {
    const id = request.params.id;
    const { Supplier } = request.body;
    const produto = await Product.findOne({ _id: id });

    if (!(await ArrayIncludes(produto.Supplier, Supplier))) {
      produto.Supplier.push(Supplier);
      produto.save();
      return response.json(produto);
    } else {
      return response.status(500).json({
        Message: "Esse produto já possue esse supplier vinculado!",
      });
    }
  },
};
