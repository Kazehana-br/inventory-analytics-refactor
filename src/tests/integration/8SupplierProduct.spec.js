const mongoose = require("mongoose");
const { app, server } = require("../../app");
const request = require("supertest");
beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect(process.env.mongotests, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async (done) => {
  server.close(); // CLOSE THE SERVER CONNECTION
  await new Promise((resolve) => setTimeout(() => resolve(), 500));
  done();
});

describe("Check Product Dependencies", () => {
  it("should to link supplier in product ", async () => {
    const supplier = await request(app).get("/supplier-all");
    const product = await request(app).get("/product-all");

    const response = await request(app)
      .post("/product-add-supplier/" + product.body[0]._id)
      .send({
        Supplier: supplier.body[0]._id,
      });
    expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBeTruthy();
  });
});

describe("Check Supplier Dependencies", () => {
  it("should to link product in supplier ", async () => {
    const supplier = await request(app).get("/supplier-all");
    const product = await request(app).get("/product-all");

    const response = await request(app)
      .post("/supplier-add-product/" + supplier.body[0]._id)
      .send({
        Product: product.body[0]._id,
      });
    expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBeTruthy();
  });
});
