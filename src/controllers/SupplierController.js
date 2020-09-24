const Supplier = require("../models/Supplier");
const ArrayIncludes = require("../utils/ArrayIncludes");

module.exports = {
  async index(request, response) {
    const fornecedores = await Supplier.find().populate("Product");
    return response.json(fornecedores);
  },
  async store(request, response) {
    const { Name, Cnpj } = request.body;
    const fornecedor = await Supplier.create({ Name, Cnpj });
    return response.json(fornecedor);
  },
  async show(request, response) {
    const id = request.params.id;
    const fornecedor = await Supplier.findOne({ _id: id }).populate("Product");
    return response.json(fornecedor);
  },
  async AddProduct(request, response) {
    const id = request.params.id;
    const { product } = request.body;
    const fornecedor = await Supplier.findOne({ _id: id });

    if (!(await ArrayIncludes(fornecedor.Product, product))) {
      fornecedor.Product.push(product);
      fornecedor.save();
      return response.json(fornecedor);
    }
    return response.status(500).json({
      Message: "Esse supplier já possue esse produto vinculado!",
    });
  },
};
