const Document = require("../../models/App/Document");

module.exports = {
  async index(request, response) {
    const documents = await Document.find();
    return response.json(documents);
  },
  async store(request, response) {
    const { Name, Date, Url } = request.body;
    const document = await Document.create({ Name, Date, Url });
    return response.json(document);
  },
  async show(request, response) {
    const id = request.params.id;
    const document = await Document.findOne({ _id: id });
    return response.json(document);
  },
};
