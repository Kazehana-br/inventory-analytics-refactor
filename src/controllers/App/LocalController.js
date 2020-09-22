const Local = require("../../models/App/Local");
const ArrayIncludes = require("../../utils/ArrayIncludes");

module.exports = {
  async index(request, response) {
    const locais = await Local.find();
    return response.json(locais);
  },
  async store(request, response) {
    const { Name } = request.body;
    const local = await Local.create({ Name });
    return response.json(local);
  },
  async show(request, response) {
    const id = request.params.id;
    const local = await Local.findOne({ _id: id }).populate("Warehouse");
    return response.json(local);
  },
  async AddWarehouse(request, response) {
    const id = request.params.id;
    const { Warehouse } = request.body;
    const local = await Local.findOne({ _id: id });

    if (!(await ArrayIncludes(local.Warehouse, Warehouse))) {
      local.Warehouse.push(Warehouse);
      local.save();
      return response.json(local);
    } else {
      return response.status(500).json({
        Message: "Essa filial já possue esse warehouse vinculado!",
      });
    }
  },
};
