const Warehouse = require("../models/Warehouse");
const ProductInput = require("../models/ProductInput");
const ProductOutput = require("../models/ProductOutput");


const ArrayIncludes = require("../utils/ArrayIncludes");

module.exports = {
  async index(request, response) {
    const warehouses = await Warehouse.find().populate("Local")
    .populate("Filial").populate("Product").populate("ProductInput").populate("ProductOutput");
    return response.json(warehouses);
  },
  async store(request, response) {
    const { WarehouseType, Local, Filial } = request.body;
    const warehouse = await Warehouse.create({ WarehouseType, Local, Filial });
    return response.json(warehouse);
  },
  async show(request, response) {
    const id = request.params.id;
    const warehouse = await Warehouse.findOne({ _id: id })
      .populate("Local")
      .populate("Filial").populate("Product").populate("ProductInput").populate("ProductOutput");
    return response.json(warehouse);
  },
  async AddProduct(request, response) {
    const id = request.params.id;
    const { Product } = request.body;
    const warehouse = await Warehouse.findOne({ _id: id });

    if (!(await ArrayIncludes(warehouse.Product, Product))) {
      warehouse.Product.push(Product);
      warehouse.save();
      return response.json(warehouse);
    }
    return response.status(500).json({
      Message: "Esse warehouse já possue esse produto vinculado!",
    });
  },
  async AddProductInput(request, response) {
    const id = request.params.id;
    const { IdProductInput } = request.body;
    const warehouse = await Warehouse.findOne({ _id: id });
    const productIn = await ProductInput.findOne({ _id: IdProductInput });
    const third = productIn.Third;



    if((warehouse.WarehouseType === 1 && third ===false ) || (warehouse.WarehouseType === 2 && third ===true)){
      if (!(await ArrayIncludes(warehouse.ProductInput, IdProductInput))) {
        warehouse.ProductInput.push(IdProductInput);
        warehouse.save();
        return response.json(warehouse);
      }
      return response.status(500).json({
        Message: "Esse warehouse já possue essa entrada vinculada!",
      });
    }

    return response.status(500).json({
      Message: "Esse warehouse não é do mesmo tipo que a entrada!",
    });

   
    
  },
  async AddProductOutput(request, response) {
    const id = request.params.id;
    const { IdProductOutput } = request.body;
    const warehouse = await Warehouse.findOne({ _id: id });
    const productOut = await ProductOutput.findOne({ _id: IdProductOutput });
    const third = productOut.Third;
    if((warehouse.WarehouseType === 1 && third ===false ) || (warehouse.WarehouseType === 2 && third ===true)){
      if (!(await ArrayIncludes(warehouse.ProductOutput, IdProductOutput))) {
        warehouse.ProductOutput.push(IdProductOutput);
        warehouse.save();
        return response.json(warehouse);
      }
      return response.status(500).json({
        Message: "Esse warehouse já possue essa saída vinculada!",
      });
    }

    return response.status(500).json({
      Message: "Esse warehouse não é do mesmo tipo que a saída!",
    });

  },
};
