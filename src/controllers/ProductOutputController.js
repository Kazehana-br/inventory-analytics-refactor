const ProductOutput = require("../models/ProductOutput");
const ArrayIncludes = require("../utils/ArrayIncludes");
const ProductQuantity = require("../utils/ProductQuantity");

module.exports = {
  async index(request, response) {
    const saidas = await ProductOutput.find().populate("Document").populate("Product");
    return response.json(saidas);
  },
  async store(request, response) {
    const { Name, Reason, Product, Quantity, UnityPrice } = request.body;
    let TotalPrice = Quantity * UnityPrice;

    if (Quantity <= 0) {
      return response.status(500).json({
        Message: "A quantidade de saida deve ser maior que zero!",
      });
    }
    const CreateAt = new Date();
    const Third = false;

    const saida = await ProductOutput.create({
      Name,
      Reason,
      Product,
      Quantity,
      UnityPrice,
      TotalPrice,
      CreateAt,
      Third
    });

    const updateQuantity = await ProductQuantity(Product, Quantity, 2);
    if (updateQuantity) {
      return response.json(saida);
    }

    return response.status(500).json({
      Message: "Ocorreu um erro nessa saída!",
    });
  },
  async storeThird(request, response) {
    const { Name, Reason, Product, Quantity } = request.body;

    if (Quantity <= 0) {
      return response.status(500).json({
        Message: "A quantidade de saida deve ser maior que zero!",
      });
    }
    const CreateAt = new Date();
    const Third = true;

    const saida = await ProductOutput.create({
      Name,
      Reason,
      Product,
      Quantity,
      UnityPrice,
      TotalPrice,
      CreateAt,
      Third
    });

    const updateQuantity = await ProductQuantity(Product, Quantity, 2);
    if (updateQuantity) {
      return response.json(saida);
    }

    return response.status(500).json({
      Message: "Ocorreu um erro nessa saída!",
    });
  },
  async show(request, response) {
    const id = request.params.id;
    const entrada = await ProductOutput.findOne({ _id: id }).populate("Document").populate("Product");
    return response.json(entrada);
  },
  async AddDocument(request, response) {
    const id = request.params.id;
    const { Document } = request.body;

    const productOutput = await ProductOutput.findOne({ _id: id });
    if (!(await ArrayIncludes(productOutput.Document, Document))) {
        productOutput.Document.push(Document);
        productOutput.save();
      return response.json(productOutput);
    }
    return response.status(500).json({
      Message: "Essa saída já possue esse documento vinculado!",
    });
  },
};
