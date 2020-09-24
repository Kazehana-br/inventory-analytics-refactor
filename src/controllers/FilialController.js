const Filial = require("../models/Filial");
const ArrayIncludes = require("../utils/ArrayIncludes");

module.exports = {
  async index(request, response) {
    const filiais = await Filial.find().populate("Warehouse");
    return response.json(filiais);
  },
  async store(request, response) {
    const { Name } = request.body;
    const filial = await Filial.create({ Name });

    return response.json(filial);
  },
  async show(request, response) {
    const id = request.params.id;
    const filial = await Filial.findOne({ _id: id }).populate("Warehouse");
    return response.json(filial);
  },
  async AddWarehouse(request, response) {
    const id = request.params.id;
    const { Warehouse } = request.body;
    const filial = await Filial.findOne({ _id: id });
    if (!(await ArrayIncludes(filial.Warehouse, Warehouse))) {
      filial.Warehouse.push(Warehouse);
      filial.save();
      return response.json(filial);
    } else {
      return response.status(500).json({
        Message: "Essa filial já possue esse warehouse vinculado!",
      });
    }
  },
};
