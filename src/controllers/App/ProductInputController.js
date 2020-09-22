const ProductInput = require("../../models/App/ProductInput");
const ArrayIncludes = require("../../utils/ArrayIncludes");
const CalcAverageCost = require("../../utils/CalcAverageCost");
const ProductQuantity = require("../../utils/ProductQuantity");

module.exports = {
  async index(request, response) {
    const entradas = await ProductInput.find();
    return response.json(entradas);
  },
  async store(request, response) {
    const { Name, Product, Quantity, UnityPrice } = request.body;
    let TotalPrice = Quantity * UnityPrice;
    let AverageCost = await CalcAverageCost(TotalPrice, Quantity);

    if (Quantity <= 0) {
      return response.status(500).json({
        Message: "A quantidade de entrada deve ser maior que zero!",
      });
    }

    const entrada = await ProductInput.create({
      Name,
      Product,
      Quantity,
      UnityPrice,
      AverageCost,
      TotalPrice,
    });

    const updateQuantity = await ProductQuantity(Product, Quantity, 1);
    if (updateQuantity) {
      return response.json(entrada);
    }

    return response.status(500).json({
      Message: "Ocorreu um erro nessa entrada!",
    });
  },
  async show(request, response) {
    const id = request.params.id;
    const entrada = await ProductInput.findOne({ _id: id });
    return response.json(entrada);
  },
  async AddDocument(request, response) {
    const id = request.params.id;
    const { Document } = request.body;

    const productInput = await ProductInput.findOne({ _id: id });
    console.log(productInput.Quantity);
    if (!(await ArrayIncludes(productInput.Document, Document))) {
      productInput.Document.push(Document);
      productInput.save();
      return response.json(productInput);
    }
    return response.status(500).json({
      Message: "Essa entrada já possue esse documento vinculado!",
    });
  },
};
