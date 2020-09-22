const Warehouse = require("../../models/App/Warehouse");
const ArrayIncludes = require("../../utils/ArrayIncludes");

module.exports = {
  async index(request, response) {
    const warehouses = await Warehouse.find();
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
      .populate("Filial");
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
    const { ProductInput } = request.body;
    const warehouse = await Warehouse.findOne({ _id: id });

    if (!(await ArrayIncludes(warehouse.ProductInput, ProductInput))) {
      warehouse.ProductInput.push(ProductInput);
      warehouse.save();
      return response.json(warehouse);
    }
    return response.status(500).json({
      Message: "Esse warehouse já possue essa entrada vinculada!",
    });
  },
};
